type AnalyticsEvent =
  | "template_page_view"
  | "free_brief_generated"
  | "signup_started"
  | "signup_completed"
  | "project_created"
  | "brief_created"
  | "brief_exported"
  | "share_link_generated"
  | "checkout_started"
  | "subscription_created"
  | "upgrade_dialog_shown";

interface EventProperties {
  [key: string]: string | number | boolean | undefined;
}

export function trackEvent(event: AnalyticsEvent, properties?: EventProperties) {
  if (typeof window === "undefined") return;

  // PostHog
  if (typeof (window as unknown as Record<string, unknown>).posthog !== "undefined") {
    const ph = (window as unknown as Record<string, unknown>).posthog as {
      capture: (event: string, props?: EventProperties) => void;
    };
    ph.capture(event, properties);
  }

  // Plausible
  if (typeof (window as unknown as Record<string, unknown>).plausible !== "undefined") {
    const pl = (window as unknown as Record<string, unknown>).plausible as (
      event: string,
      opts?: { props?: EventProperties }
    ) => void;
    pl(event, { props: properties });
  }

  // Dev logging
  if (process.env.NODE_ENV === "development") {
    console.log("[Analytics]", event, properties);
  }
}
