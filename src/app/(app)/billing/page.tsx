"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PLAN_DETAILS } from "@/lib/stripe";

interface SubscriptionData {
  plan: string;
  status: string;
  currentPeriodEnd: string | null;
}

export default function BillingPage() {
  const [subscription, setSubscription] = useState<SubscriptionData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(() => {
    if (typeof window === "undefined") return "";
    const params = new URLSearchParams(window.location.search);
    if (params.get("success")) return "Subscription activated! Welcome to BriefedWed.";
    if (params.get("canceled")) return "Checkout was canceled. You can try again any time.";
    return "";
  });

  useEffect(() => {
    let ignore = false;

    async function fetchSubscription() {
      const res = await fetch("/api/billing/subscription");
      if (res.ok && !ignore) {
        const data = await res.json();
        setSubscription(data);
      }
    }

    void fetchSubscription();

    return () => {
      ignore = true;
    };
  }, []);

  async function handleCheckout(priceId: string, mode: string) {
    setIsLoading(true);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId, mode }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.assign(data.url);
      } else if (data.error === "Stripe not configured") {
        setMessage("Stripe is not configured yet. Payment will be available soon.");
      }
    } catch {
      setMessage("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  async function handlePortal() {
    setIsLoading(true);
    try {
      const res = await fetch("/api/stripe/portal", { method: "POST" });
      const data = await res.json();
      if (data.url) {
        window.location.assign(data.url);
      } else {
        setMessage("Billing portal not available. Contact support.");
      }
    } catch {
      setMessage("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  const planGroups = [
    { name: "Solo", monthly: PLAN_DETAILS[0], yearly: PLAN_DETAILS[1] },
    { name: "Studio", monthly: PLAN_DETAILS[2], yearly: PLAN_DETAILS[3] },
  ];

  const isPaid = subscription && subscription.plan !== "free";

  return (
    <div>
      <h1 className="text-2xl font-bold text-stone-900 mb-6">Billing</h1>

      {message && (
        <div className="bg-blue-50 border border-blue-200 text-blue-800 rounded-lg p-3 mb-6 text-sm">
          {message}
        </div>
      )}

      {/* Current plan */}
      {subscription && (
        <div className="bg-white rounded-xl border border-stone-200 p-5 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-stone-900">Current plan</h2>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="outline" className="text-xs">
                  {subscription.plan.charAt(0).toUpperCase() + subscription.plan.slice(1)}
                </Badge>
                <Badge
                  variant="outline"
                  className={`text-xs ${subscription.status === "active" ? "bg-green-50 text-green-700 border-green-200" : ""}`}
                >
                  {subscription.status}
                </Badge>
              </div>
              {subscription.currentPeriodEnd && (
                <p className="text-xs text-stone-400 mt-1">
                  Renews {new Date(subscription.currentPeriodEnd).toLocaleDateString()}
                </p>
              )}
            </div>
            {isPaid && (
              <Button variant="outline" size="sm" onClick={handlePortal} disabled={isLoading}>
                Manage subscription
              </Button>
            )}
          </div>
        </div>
      )}

      {/* Plans */}
      {!isPaid && (
        <div>
          <h2 className="text-lg font-semibold text-stone-900 mb-4">Upgrade your plan</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {planGroups.map((group) => (
              <div key={group.name} className="border border-stone-200 rounded-xl overflow-hidden">
                <div className="bg-stone-50 px-5 py-3 border-b border-stone-200">
                  <h3 className="font-semibold text-stone-900">{group.name}</h3>
                </div>
                <div className="p-5 space-y-3">
                  <button
                    onClick={() => handleCheckout(group.monthly.priceId, "subscription")}
                    disabled={isLoading || !group.monthly.priceId}
                    className="w-full text-left p-3 rounded-lg border border-stone-200 hover:border-rose-300 hover:bg-rose-50 transition-all group"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-stone-900 text-sm">Monthly</p>
                        <p className="text-2xl font-bold text-stone-900">
                          ${group.monthly.price}
                          <span className="text-sm font-normal text-stone-400">/mo</span>
                        </p>
                      </div>
                      <span className="text-xs text-rose-600 group-hover:underline">
                        {group.monthly.priceId ? "Subscribe" : "Coming soon"}
                      </span>
                    </div>
                  </button>
                  <button
                    onClick={() => handleCheckout(group.yearly.priceId, "subscription")}
                    disabled={isLoading || !group.yearly.priceId}
                    className="w-full text-left p-3 rounded-lg border border-stone-200 hover:border-rose-300 hover:bg-rose-50 transition-all group"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-stone-900 text-sm">
                          Annual
                          <span className="ml-2 text-xs bg-green-100 text-green-700 px-1.5 py-0.5 rounded">
                            Save 2 months
                          </span>
                        </p>
                        <p className="text-2xl font-bold text-stone-900">
                          ${group.yearly.price}
                          <span className="text-sm font-normal text-stone-400">/yr</span>
                        </p>
                      </div>
                      <span className="text-xs text-rose-600 group-hover:underline">
                        {group.yearly.priceId ? "Subscribe" : "Coming soon"}
                      </span>
                    </div>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 border border-stone-200 rounded-xl p-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-stone-900">One-off Pack</h3>
                <p className="text-sm text-stone-500 mt-0.5">Single wedding brief pack — no subscription</p>
                <p className="text-2xl font-bold text-stone-900 mt-1">$15</p>
              </div>
              <Button
                onClick={() => handleCheckout(PLAN_DETAILS[4].priceId, "payment")}
                disabled={isLoading || !PLAN_DETAILS[4].priceId}
                variant="outline"
              >
                Buy one-off
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
