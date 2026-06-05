"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createProject } from "../actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { UpgradeDialog } from "@/components/app/UpgradeDialog";
import { trackEvent } from "@/lib/analytics";
import Link from "next/link";

export default function NewProjectPage() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showUpgrade, setShowUpgrade] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    try {
      const result = await createProject(formData);
      if (result.error === "upgrade_required") {
        setShowUpgrade(true);
        return;
      }
      if (result.error) {
        setError(result.error);
        return;
      }
      trackEvent("project_created");
      router.push(`/projects/${result.projectId}`);
    } catch {
      setError("Failed to create project. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="max-w-xl">
      <div className="mb-6">
        <Link href="/projects" className="text-sm text-stone-500 hover:text-stone-700">
          ← Back to projects
        </Link>
        <h1 className="text-2xl font-bold text-stone-900 mt-3">New wedding project</h1>
        <p className="text-stone-500 text-sm mt-1">
          Add the basic wedding details. You can add vendors and briefs after.
        </p>
      </div>

      <div className="bg-white rounded-xl border border-stone-200 p-6">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <Label htmlFor="coupleNames">Couple names *</Label>
            <Input
              id="coupleNames"
              name="coupleNames"
              placeholder="Sarah & Tom Johnson"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="weddingDate">Wedding date</Label>
              <Input id="weddingDate" name="weddingDate" type="date" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="brandName">Your brand/studio</Label>
              <Input id="brandName" name="brandName" placeholder="Your Studio Name" />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="venueName">Venue name</Label>
            <Input id="venueName" name="venueName" placeholder="The Grand Ballroom" />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="venueLocation">Venue location</Label>
            <Input id="venueLocation" name="venueLocation" placeholder="Austin, TX" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="editorName">Editor name</Label>
              <Input id="editorName" name="editorName" placeholder="Jamie T." />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="editorEmail">Editor email</Label>
              <Input id="editorEmail" name="editorEmail" type="email" placeholder="editor@email.com" />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="notes">Internal notes</Label>
            <Textarea
              id="notes"
              name="notes"
              placeholder="Any notes about this wedding, couple preferences, special considerations..."
              className="min-h-[80px]"
            />
          </div>

          {error && (
            <div className="text-sm text-rose-600 bg-rose-50 border border-rose-200 rounded-md p-2.5">
              {error}
            </div>
          )}

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-rose-700 hover:bg-rose-800 text-white"
          >
            {isLoading ? "Creating..." : "Create project"}
          </Button>
        </form>
      </div>

      <UpgradeDialog
        open={showUpgrade}
        onClose={() => setShowUpgrade(false)}
        message="You've reached the free plan project limit. Upgrade to create unlimited wedding projects."
      />
    </div>
  );
}
