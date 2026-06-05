"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

const VENDOR_CATEGORIES = [
  "Venue",
  "Planner / Coordinator",
  "Florist",
  "Photographer",
  "Videographer",
  "DJ",
  "Live Band",
  "Hair & Makeup",
  "Dress / Attire",
  "Caterer",
  "Cake / Desserts",
  "Photo Booth",
  "Transport",
  "Officiant",
  "Stationery",
  "Lighting",
  "Other",
];

interface VendorFormProps {
  initialData?: {
    name?: string;
    category?: string;
    instagramHandle?: string | null;
    website?: string | null;
    notes?: string | null;
  };
  onSubmit: (formData: FormData) => Promise<void>;
  isLoading?: boolean;
  submitLabel?: string;
}

export function VendorForm({
  initialData = {},
  onSubmit,
  isLoading,
  submitLabel = "Save Vendor",
}: VendorFormProps) {
  const [category, setCategory] = useState(initialData.category ?? "");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.set("category", category);
    await onSubmit(formData);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-1.5">
        <Label htmlFor="name">Vendor Name *</Label>
        <Input
          id="name"
          name="name"
          defaultValue={initialData.name ?? ""}
          placeholder="e.g. The Ivory Venue, Bloom & Branch Florals"
          required
        />
      </div>

      <div className="space-y-1.5">
        <Label>Category *</Label>
        <Select value={category} onValueChange={setCategory} required>
          <SelectTrigger>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {VENDOR_CATEGORIES.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="instagramHandle">Instagram Handle</Label>
        <Input
          id="instagramHandle"
          name="instagramHandle"
          defaultValue={initialData.instagramHandle ?? ""}
          placeholder="@vendorname"
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="website">Website</Label>
        <Input
          id="website"
          name="website"
          type="url"
          defaultValue={initialData.website ?? ""}
          placeholder="https://vendorwebsite.com"
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="notes">Notes</Label>
        <Textarea
          id="notes"
          name="notes"
          defaultValue={initialData.notes ?? ""}
          placeholder="Any notes about this vendor..."
        />
      </div>

      <Button
        type="submit"
        disabled={isLoading || !category}
        className="w-full bg-rose-700 hover:bg-rose-800 text-white"
      >
        {isLoading ? "Saving..." : submitLabel}
      </Button>
    </form>
  );
}
