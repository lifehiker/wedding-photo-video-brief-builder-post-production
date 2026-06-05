"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { BriefTypeSelector } from "@/components/app/BriefTypeSelector";
import { BriefForm } from "@/components/app/BriefForm";
import { getBriefTemplate, BriefType } from "@/lib/brief-templates";
import { createBrief } from "../actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UpgradeDialog } from "@/components/app/UpgradeDialog";
import { trackEvent } from "@/lib/analytics";
import Link from "next/link";

export default function NewBriefPage() {
  const params = useParams();
  const projectId = params.projectId as string;
  const router = useRouter();

  const [step, setStep] = useState<"type" | "form">("type");
  const [selectedType, setSelectedType] = useState<BriefType | undefined>();
  const [briefTitle, setBriefTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [canUseAllBriefTypes, setCanUseAllBriefTypes] = useState(false);

  useEffect(() => {
    fetch("/api/user/permissions")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => setCanUseAllBriefTypes(!!data?.canUseAllBriefTypes))
      .catch(() => setCanUseAllBriefTypes(false));
  }, []);

  function handleTypeNext() {
    if (!selectedType) return;
    const template = getBriefTemplate(selectedType);
    setBriefTitle(template.label);
    setStep("form");
  }

  async function handleFormSubmit(data: Record<string, string>) {
    if (!selectedType) return;
    setIsLoading(true);
    setError("");

    const formData = new FormData();
    formData.set("type", selectedType);
    formData.set("title", briefTitle);
    formData.set("formData", JSON.stringify(data));

    try {
      const result = await createBrief(projectId, formData);
      if (result.error === "upgrade_required") {
        setShowUpgrade(true);
        return;
      }
      if (result.error) {
        setError(result.error);
        return;
      }
      trackEvent("brief_created", { briefType: selectedType });
      router.push(`/projects/${projectId}/briefs/${result.briefId}`);
    } catch {
      setError("Failed to create brief. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="max-w-2xl">
      <div className="mb-6">
        <Link href={`/projects/${projectId}`} className="text-sm text-stone-500 hover:text-stone-700">
          ← Back to project
        </Link>
        <h1 className="text-2xl font-bold text-stone-900 mt-3">New brief</h1>
      </div>

      {step === "type" && (
        <div className="space-y-5">
          <div>
            <h2 className="text-base font-semibold text-stone-900 mb-1">Select brief type</h2>
            <p className="text-sm text-stone-500">Choose the type of deliverable this brief is for.</p>
          </div>
          <BriefTypeSelector
            selected={selectedType}
            onSelect={setSelectedType}
            isPaidUser={canUseAllBriefTypes}
          />
          <Button
            onClick={handleTypeNext}
            disabled={!selectedType}
            className="w-full bg-rose-700 hover:bg-rose-800 text-white"
          >
            Continue
          </Button>
        </div>
      )}

      {step === "form" && selectedType && (
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-stone-900">
              {getBriefTemplate(selectedType).label}
            </h2>
            <Button variant="ghost" size="sm" onClick={() => setStep("type")}>
              Change type
            </Button>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="briefTitle">Brief title</Label>
            <Input
              id="briefTitle"
              value={briefTitle}
              onChange={(e) => setBriefTitle(e.target.value)}
              placeholder="e.g. Sarah & Tom — Highlight Film"
            />
          </div>

          {error && (
            <div className="text-sm text-rose-600 bg-rose-50 border border-rose-200 rounded-md p-2.5">
              {error}
            </div>
          )}

          <div className="bg-white rounded-xl border border-stone-200 p-5">
            <BriefForm
              template={getBriefTemplate(selectedType)}
              onSubmit={handleFormSubmit}
              isLoading={isLoading}
            />
          </div>
        </div>
      )}

      <UpgradeDialog
        open={showUpgrade}
        onClose={() => setShowUpgrade(false)}
      />
    </div>
  );
}
