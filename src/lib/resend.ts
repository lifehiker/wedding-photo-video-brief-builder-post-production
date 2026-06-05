export async function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  const { Resend } = await import("resend");
  return new Resend(key);
}

export async function sendWelcomeEmail(to: string, name?: string) {
  const resend = await getResend();
  if (!resend) {
    console.log("[Resend] No API key set, skipping welcome email to:", to);
    return;
  }

  const displayName = name || "there";
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://briefedwed.com";

  const html = `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>Welcome to BriefedWed</title></head>
<body style="font-family: system-ui, sans-serif; background: #fafaf9; padding: 40px 20px; margin: 0;">
  <div style="max-width: 560px; margin: 0 auto; background: #fff; border-radius: 8px; border: 1px solid #e7e5e4; padding: 40px;">
    <h1 style="font-size: 22px; color: #1c1917; margin-bottom: 12px;">Welcome to BriefedWed</h1>
    <p style="color: #57534e; font-size: 15px; line-height: 1.6;">Hi ${displayName},</p>
    <p style="color: #57534e; font-size: 15px; line-height: 1.7;">You're now set up on BriefedWed — the post-production brief builder for wedding photographers and videographers.</p>
    <p style="color: #57534e; font-size: 15px; line-height: 1.7; margin-bottom: 8px;">Get started:</p>
    <ol style="color: #57534e; font-size: 15px; line-height: 1.8; padding-left: 20px;">
      <li><strong>Create your first project</strong> — couple names, wedding date, venue</li>
      <li><strong>Select a brief type</strong> — full film, highlight, Reel, TikTok, culling, Lightroom, and more</li>
      <li><strong>Fill in the brief fields</strong> — must-have moments, music, pacing, vendor tags</li>
      <li><strong>Export or share</strong> — copy, Markdown, PDF, or direct editor share link</li>
    </ol>
    <a href="${appUrl}/dashboard" style="display: inline-block; margin-top: 24px; background: #9f1239; color: #fff; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: 600; font-size: 14px;">
      Go to your dashboard
    </a>
    <hr style="border: none; border-top: 1px solid #e7e5e4; margin: 28px 0 16px;">
    <p style="font-size: 12px; color: #a8a29e;">BriefedWed — Wedding post-production briefs for photographers & videographers</p>
  </div>
</body>
</html>`;

  try {
    await resend.emails.send({
      from: "BriefedWed <noreply@briefedwed.com>",
      to,
      subject: "Welcome to BriefedWed — Your wedding editor briefs start here",
      html,
    });
  } catch (err) {
    console.error("[Resend] Failed to send welcome email:", err);
  }
}
