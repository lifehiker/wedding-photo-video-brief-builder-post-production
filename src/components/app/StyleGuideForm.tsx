"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

interface StyleGuideFormProps {
  initialData?: {
    name?: string;
    editingStyle?: string | null;
    colorPreferences?: string | null;
    musicPreferences?: string | null;
    pacingNotes?: string | null;
    socialCaptionStyle?: string | null;
    deliveryDefaults?: string | null;
    isDefault?: boolean;
  };
  onSubmit: (formData: FormData) => Promise<void>;
  isLoading?: boolean;
  submitLabel?: string;
}

export function StyleGuideForm({
  initialData = {},
  onSubmit,
  isLoading,
  submitLabel = "Save Style Guide",
}: StyleGuideFormProps) {
  const [isDefault, setIsDefault] = useState(initialData.isDefault ?? false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.set("isDefault", isDefault.toString());
    await onSubmit(formData);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-1.5">
        <Label htmlFor="name">Style Guide Name *</Label>
        <Input
          id="name"
          name="name"
          defaultValue={initialData.name ?? ""}
          placeholder="e.g. My Signature Style, Warm & Cinematic"
          required
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="editingStyle">Editing Style</Label>
        <Textarea
          id="editingStyle"
          name="editingStyle"
          defaultValue={initialData.editingStyle ?? ""}
          placeholder="Describe your signature editing style — cinematic, documentary, bright & airy, dark & moody..."
          className="min-h-[80px]"
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="colorPreferences">Color Preferences</Label>
        <Textarea
          id="colorPreferences"
          name="colorPreferences"
          defaultValue={initialData.colorPreferences ?? ""}
          placeholder="Warm tones, creamy highlights, desaturated greens, cool shadows..."
          className="min-h-[80px]"
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="musicPreferences">Music Preferences</Label>
        <Textarea
          id="musicPreferences"
          name="musicPreferences"
          defaultValue={initialData.musicPreferences ?? ""}
          placeholder="Preferred genres, artists, tempo, licensing source (Musicbed, Artlist, Epidemic Sound)..."
          className="min-h-[80px]"
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="pacingNotes">Pacing Notes</Label>
        <Textarea
          id="pacingNotes"
          name="pacingNotes"
          defaultValue={initialData.pacingNotes ?? ""}
          placeholder="Slow & emotional with a mid-film energy build, or fast cuts for reception..."
          className="min-h-[80px]"
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="socialCaptionStyle">Social Caption Style</Label>
        <Textarea
          id="socialCaptionStyle"
          name="socialCaptionStyle"
          defaultValue={initialData.socialCaptionStyle ?? ""}
          placeholder="Short & romantic, 3 lines max. Couple names + venue + date. Always tag vendors..."
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="deliveryDefaults">Delivery Defaults</Label>
        <Textarea
          id="deliveryDefaults"
          name="deliveryDefaults"
          defaultValue={initialData.deliveryDefaults ?? ""}
          placeholder="Default delivery timeline, preferred formats, resolution defaults..."
        />
      </div>

      <div className="flex items-center gap-2">
        <Checkbox
          id="isDefault"
          checked={isDefault}
          onCheckedChange={(v) => setIsDefault(!!v)}
        />
        <Label htmlFor="isDefault" className="text-sm font-normal cursor-pointer">
          Set as default style guide (auto-applied to new briefs)
        </Label>
      </div>

      <Button
        type="submit"
        disabled={isLoading}
        className="w-full bg-rose-700 hover:bg-rose-800 text-white"
      >
        {isLoading ? "Saving..." : submitLabel}
      </Button>
    </form>
  );
}
