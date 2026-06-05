/* eslint-disable @next/next/no-head-element */
import * as React from "react";

interface WelcomeEmailProps {
  name?: string;
}

export function WelcomeEmail({ name = "there" }: WelcomeEmailProps) {
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Welcome to BriefedWed</title>
      </head>
      <body style={{ fontFamily: "Georgia, serif", backgroundColor: "#fafaf9", margin: 0, padding: 0 }}>
        <table width="100%" cellPadding="0" cellSpacing="0" style={{ backgroundColor: "#fafaf9", padding: "40px 20px" }}>
          <tr>
            <td align="center">
              <table width="600" cellPadding="0" cellSpacing="0" style={{ backgroundColor: "#ffffff", borderRadius: "8px", border: "1px solid #e7e5e4" }}>
                <tr>
                  <td style={{ padding: "40px" }}>
                    <h1 style={{ fontSize: "24px", color: "#1c1917", marginBottom: "8px", fontWeight: "600" }}>
                      Welcome to BriefedWed
                    </h1>
                    <p style={{ fontSize: "16px", color: "#57534e", lineHeight: "1.6", marginBottom: "24px" }}>
                      Hi {name},
                    </p>
                    <p style={{ fontSize: "15px", color: "#57534e", lineHeight: "1.7", marginBottom: "16px" }}>
                      You&apos;re now set up on BriefedWed — the post-production brief builder for wedding photographers and videographers.
                    </p>
                    <p style={{ fontSize: "15px", color: "#57534e", lineHeight: "1.7", marginBottom: "24px" }}>
                      Here&apos;s how to get started:
                    </p>
                    <ol style={{ fontSize: "15px", color: "#57534e", lineHeight: "1.8", paddingLeft: "20px", marginBottom: "28px" }}>
                      <li><strong>Create your first project</strong> — add couple names, wedding date, and venue</li>
                      <li><strong>Select a brief type</strong> — full film, highlight, Reel, TikTok, culling, Lightroom editing, and more</li>
                      <li><strong>Fill in the brief fields</strong> — must-have moments, music direction, pacing, vendor tags</li>
                      <li><strong>Export or share</strong> — copy, download Markdown, print as PDF, or send a share link to your editor</li>
                    </ol>
                    <table cellPadding="0" cellSpacing="0" style={{ marginBottom: "28px" }}>
                      <tr>
                        <td>
                          <a
                            href={`${process.env.NEXT_PUBLIC_APP_URL ?? "https://briefedwed.com"}/dashboard`}
                            style={{
                              display: "inline-block",
                              backgroundColor: "#9f1239",
                              color: "#ffffff",
                              padding: "12px 24px",
                              borderRadius: "6px",
                              textDecoration: "none",
                              fontWeight: "600",
                              fontSize: "14px",
                            }}
                          >
                            Go to your dashboard
                          </a>
                        </td>
                      </tr>
                    </table>
                    <p style={{ fontSize: "14px", color: "#a8a29e", lineHeight: "1.6" }}>
                      Questions? Reply to this email — we&apos;re a small team and we read everything.
                    </p>
                    <hr style={{ border: "none", borderTop: "1px solid #e7e5e4", margin: "28px 0 20px" }} />
                    <p style={{ fontSize: "12px", color: "#a8a29e" }}>
                      BriefedWed &mdash; Wedding post-production briefs for photographers &amp; videographers
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  );
}

export default WelcomeEmail;
