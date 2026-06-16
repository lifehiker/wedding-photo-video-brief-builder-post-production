"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { trackEvent } from "@/lib/analytics";

const roles = [
  { id: "videographer", label: "Wedding videographer" },
  { id: "photographer", label: "Wedding photographer" },
  { id: "hybrid", label: "Hybrid studio (photo + video)" },
  { id: "editor", label: "Wedding editor / post-production" },
];

const deliverableOptions = [
  { id: "full_film", label: "Full wedding films" },
  { id: "highlight", label: "Highlight films" },
  { id: "reels", label: "Instagram Reels" },
  { id: "tiktok", label: "TikTok content" },
  { id: "sneak_peek", label: "Sneak peeks / teasers" },
  { id: "photo_culling", label: "Photo culling" },
  { id: "lightroom", label: "Lightroom editing" },
  { id: "vendor_clips", label: "Vendor promo clips" },
];

export function OnboardingFlow() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [role, setRole] = useState("");
  const [outsource, setOutsource] = useState(false);
  const [deliverables, setDeliverables] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  function toggleDeliverable(id: string) {
    setDeliverables((prev) =>
      prev.includes(id) ? prev.filter((d) => d !== id) : [...prev, id]
    );
  }

  async function handleFinish() {
    setIsLoading(true);
    try {
      await fetch("/api/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role, outsource, deliverables: deliverables.join(",") }),
      });
      trackEvent("signup_completed");
      router.push("/dashboard");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      {step === 1 && (
        <div className="space-y-4">
          <h2 className="font-semibold text-stone-900">What best describes you?</h2>
          <div className="grid grid-cols-1 gap-3">
            {roles.map((r) => (
              <button
                key={r.id}
                onClick={() => setRole(r.id)}
                className={`text-left p-4 rounded-lg border transition-all ${
                  role === r.id
                    ? "border-rose-500 bg-rose-50 ring-1 ring-rose-500"
                    : "border-stone-200 hover:border-stone-300 bg-white"
                }`}
              >
                <span className="font-medium text-stone-900 text-sm">{r.label}</span>
              </button>
            ))}
          </div>
          <Button
            onClick={() => setStep(2)}
            disabled={!role}
            className="w-full bg-rose-700 hover:bg-rose-800 text-white"
          >
            Continue
          </Button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <h2 className="font-semibold text-stone-900">Do you outsource any editing?</h2>
          <div className="grid grid-cols-2 gap-3">
            {[
              { val: true, label: "Yes, I outsource editing" },
              { val: false, label: "No, I edit everything myself" },
            ].map((opt) => (
              <button
                key={String(opt.val)}
                onClick={() => setOutsource(opt.val)}
                className={`text-left p-4 rounded-lg border transition-all ${
                  outsource === opt.val
                    ? "border-rose-500 bg-rose-50 ring-1 ring-rose-500"
                    : "border-stone-200 hover:border-stone-300 bg-white"
                }`}
              >
                <span className="font-medium text-stone-900 text-sm">{opt.label}</span>
              </button>
            ))}
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
              Back
            </Button>
            <Button
              onClick={() => setStep(3)}
              className="flex-1 bg-rose-700 hover:bg-rose-800 text-white"
            >
              Continue
            </Button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-4">
          <h2 className="font-semibold text-stone-900">What deliverables do you work with?</h2>
          <p className="text-sm text-stone-500">Select all that apply.</p>
          <div className="grid grid-cols-1 gap-2">
            {deliverableOptions.map((opt) => (
              <label
                key={opt.id}
                className="flex items-center gap-3 p-3 rounded-lg border border-stone-200 cursor-pointer hover:bg-stone-50"
              >
                <Checkbox
                  checked={deliverables.includes(opt.id)}
                  onCheckedChange={() => toggleDeliverable(opt.id)}
                />
                <Label className="text-sm font-normal cursor-pointer">{opt.label}</Label>
              </label>
            ))}
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => setStep(2)} className="flex-1">
              Back
            </Button>
            <Button
              onClick={handleFinish}
              disabled={isLoading}
              className="flex-1 bg-rose-700 hover:bg-rose-800 text-white"
            >
              {isLoading ? "Setting up..." : "Go to dashboard"}
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
