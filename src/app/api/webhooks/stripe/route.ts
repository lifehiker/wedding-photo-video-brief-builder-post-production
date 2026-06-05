import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
  const stripe = await getStripe();
  if (!stripe) {
    return NextResponse.json({ error: "Stripe not configured" }, { status: 503 });
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    return NextResponse.json({ error: "Webhook secret not configured" }, { status: 503 });
  }

  const body = await req.text();
  const signature = req.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "No signature" }, { status: 400 });
  }

  let event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    console.error("[Stripe Webhook] Invalid signature:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as {
          metadata?: { userId?: string };
          subscription?: string;
          customer?: string;
          mode?: string;
          amount_total?: number;
        };
        const userId = session.metadata?.userId;
        if (!userId) break;

        if (session.mode === "subscription" && session.subscription) {
          const sub = await stripe.subscriptions.retrieve(session.subscription as string);
          const priceId = sub.items.data[0]?.price?.id ?? "";
          const plan = getPlanFromPriceId(priceId);

          await db.subscription.upsert({
            where: { userId },
            create: {
              userId,
              stripeCustomerId: session.customer as string,
              stripeSubscriptionId: session.subscription as string,
              status: sub.status,
              priceId,
              plan,
              currentPeriodEnd: new Date((sub as unknown as { current_period_end: number }).current_period_end * 1000),
            },
            update: {
              stripeSubscriptionId: session.subscription as string,
              status: sub.status,
              priceId,
              plan,
              currentPeriodEnd: new Date((sub as unknown as { current_period_end: number }).current_period_end * 1000),
            },
          });
        } else if (session.mode === "payment") {
          // One-off purchase
          await db.subscription.upsert({
            where: { userId },
            create: {
              userId,
              stripeCustomerId: session.customer as string,
              status: "one_off",
              plan: "solo",
            },
            update: {
              status: "one_off",
              plan: "solo",
            },
          });
        }
        break;
      }

      case "customer.subscription.updated": {
        const sub = event.data.object as unknown as {
          id: string;
          status: string;
          items: { data: Array<{ price: { id: string } }> };
          current_period_end: number;
          customer: string;
        };
        const dbSub = await db.subscription.findFirst({
          where: { stripeSubscriptionId: sub.id },
        });
        if (!dbSub) break;

        const priceId = sub.items.data[0]?.price?.id ?? "";
        const plan = getPlanFromPriceId(priceId);

        await db.subscription.update({
          where: { id: dbSub.id },
          data: {
            status: sub.status,
            priceId,
            plan,
            currentPeriodEnd: new Date(sub.current_period_end * 1000),
          },
        });
        break;
      }

      case "customer.subscription.deleted": {
        const sub = event.data.object as { id: string };
        const dbSub = await db.subscription.findFirst({
          where: { stripeSubscriptionId: sub.id },
        });
        if (!dbSub) break;

        await db.subscription.update({
          where: { id: dbSub.id },
          data: { status: "canceled", plan: "free" },
        });
        break;
      }
    }
  } catch (err) {
    console.error("[Stripe Webhook] Handler error:", err);
    return NextResponse.json({ error: "Handler error" }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}

function getPlanFromPriceId(priceId: string): string {
  const studioMonthly = process.env.STRIPE_PRICE_STUDIO_MONTHLY ?? "";
  const studioYearly = process.env.STRIPE_PRICE_STUDIO_YEARLY ?? "";

  if (priceId === studioMonthly || priceId === studioYearly) return "studio";
  return "solo";
}
