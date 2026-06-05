"use client";

import { useState } from "react";
import { BriefTypeSelector } from "@/components/app/BriefTypeSelector";
import { BriefForm } from "@/components/app/BriefForm";
import { BriefPreview } from "@/components/app/BriefPreview";
import { getBriefTemplate, BriefType } from "@/lib/brief-templates";
import { generateBriefText } from "@/lib/generate-brief";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { trackEvent } from "@/lib/analytics";
import Link from "next/link";

export default function FreeBriefGeneratorPage() {
  const [step, setStep] = useState<"type" | "details" | "form" | "preview">("type");
  const [selectedType, setSelectedType] = useState<BriefType | undefined>();
  const [coupleNames, setCoupleNames] = useState("");
  const [weddingDate, setWeddingDate] = useState("");
  const [generatedText, setGeneratedText] = useState("");

  function handleTypeSelect(type: BriefType) {
    setSelectedType(type);
  }

  function handleTypeNext() {
    if (!selectedType) return;
    setStep("details");
  }

  function handleDetailsNext() {
    if (!coupleNames.trim()) return;
    setStep("form");
  }

  function handleFormSubmit(data: Record<string, string>) {
    if (!selectedType) return;
    const template = getBriefTemplate(selectedType);
    const text = generateBriefText({
      briefType: selectedType,
      title: `${coupleNames} — ${template.label}`,
      formData: data,
      project: {
        coupleNames,
        weddingDate: weddingDate ? new Date(weddingDate) : null,
      },
    });
    setGeneratedText(text);
    setStep("preview");
    trackEvent("free_brief_generated", { briefType: selectedType });
  }

  function handleCopy() {
    navigator.clipboard.writeText(generatedText);
  }

  function handleDownload() {
    const blob = new Blob([generatedText], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${coupleNames.replace(/[^a-z0-9]/gi, "-").toLowerCase()}-brief.md`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="py-12 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-stone-900 mb-2">
            Free Wedding Brief Generator
          </h1>
          <p className="text-stone-600">
            Generate a structured editor brief without creating an account.
          </p>
        </div>

        {/* Progress */}
        <div className="flex items-center gap-2 mb-8">
          {["type", "details", "form", "preview"].map((s, i) => (
            <div key={s} className="flex items-center gap-2 flex-1">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium ${
                  step === s
                    ? "bg-rose-700 text-white"
                    : i < ["type", "details", "form", "preview"].indexOf(step)
                    ? "bg-rose-200 text-rose-700"
                    : "bg-stone-100 text-stone-400"
                }`}
              >
                {i + 1}
              </div>
              {i < 3 && <div className={`flex-1 h-0.5 ${i < ["type", "details", "form", "preview"].indexOf(step) ? "bg-rose-200" : "bg-stone-100"}`} />}
            </div>
          ))}
        </div>

        {/* Step 1: Select type */}
        {step === "type" && (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-stone-900">
              Select a brief type
            </h2>
            <BriefTypeSelector
              selected={selectedType}
              onSelect={handleTypeSelect}
              isPaidUser={false}
            />
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-sm text-amber-800">
              Free access: Wedding Film, Reel, and Culling briefs.
              <Link href="/signup" className="underline ml-1">Sign up free</Link> to unlock all 10 brief types.
            </div>
            <Button
              onClick={handleTypeNext}
              disabled={!selectedType}
              className="w-full bg-rose-700 hover:bg-rose-800 text-white"
            >
              Continue
            </Button>
          </div>
        )}

        {/* Step 2: Wedding details */}
        {step === "details" && (
          <div className="space-y-5">
            <div>
              <h2 className="text-lg font-semibold text-stone-900 mb-1">
                Wedding details
              </h2>
              <p className="text-sm text-stone-500">A few basics to personalize your brief.</p>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="coupleNames">Couple names *</Label>
              <Input
                id="coupleNames"
                value={coupleNames}
                onChange={(e) => setCoupleNames(e.target.value)}
                placeholder="e.g. Sarah & Tom"
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="weddingDate">Wedding date (optional)</Label>
              <Input
                id="weddingDate"
                type="date"
                value={weddingDate}
                onChange={(e) => setWeddingDate(e.target.value)}
              />
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setStep("type")} className="flex-1">
                Back
              </Button>
              <Button
                onClick={handleDetailsNext}
                disabled={!coupleNames.trim()}
                className="flex-1 bg-rose-700 hover:bg-rose-800 text-white"
              >
                Continue
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Fill form */}
        {step === "form" && selectedType && (
          <div className="space-y-5">
            <div>
              <h2 className="text-lg font-semibold text-stone-900 mb-1">
                Brief details
              </h2>
              <p className="text-sm text-stone-500">
                Fill in as much as you know. Starred fields are required.
              </p>
            </div>
            <BriefForm
              template={getBriefTemplate(selectedType)}
              onSubmit={handleFormSubmit}
            />
            <Button variant="outline" onClick={() => setStep("details")} className="w-full">
              Back
            </Button>
          </div>
        )}

        {/* Step 4: Preview */}
        {step === "preview" && (
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-stone-900">Your brief</h2>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handleCopy}>
                  Copy
                </Button>
                <Button variant="outline" size="sm" onClick={handleDownload}>
                  Download
                </Button>
              </div>
            </div>

            <BriefPreview content={generatedText} />

            <div className="bg-rose-50 border border-rose-200 rounded-xl p-5">
              <h3 className="font-semibold text-stone-900 mb-1">Save this brief?</h3>
              <p className="text-sm text-stone-600 mb-4">
                Create a free account to save projects, generate more briefs, and access style guides.
              </p>
              <div className="flex flex-col sm:flex-row gap-2">
                <Button asChild className="bg-rose-700 hover:bg-rose-800 text-white" size="sm">
                  <Link href="/signup">Create free account</Link>
                </Button>
                <Button asChild variant="outline" size="sm">
                  <Link href="/login">Sign in</Link>
                </Button>
              </div>
            </div>

            <Button
              variant="outline"
              onClick={() => {
                setStep("type");
                setSelectedType(undefined);
                setGeneratedText("");
                setCoupleNames("");
                setWeddingDate("");
              }}
              className="w-full"
            >
              Generate another brief
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
