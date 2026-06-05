"use client";

import { useState } from "react";
import { BriefTemplate, BriefField } from "@/lib/brief-templates";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface BriefFormProps {
  template: BriefTemplate;
  initialData?: Record<string, string>;
  onSubmit: (data: Record<string, string>) => void;
  isLoading?: boolean;
}

export function BriefForm({ template, initialData = {}, onSubmit, isLoading }: BriefFormProps) {
  const [formData, setFormData] = useState<Record<string, string>>(initialData);

  function handleChange(key: string, value: string) {
    setFormData((prev) => ({ ...prev, [key]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit(formData);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {template.fields.map((field: BriefField) => (
        <div key={field.key} className="space-y-1.5">
          <Label htmlFor={field.key} className="text-sm font-medium text-stone-700">
            {field.label}
            {field.required && <span className="text-rose-500 ml-0.5">*</span>}
          </Label>

          {field.hint && (
            <p className="text-xs text-stone-400">{field.hint}</p>
          )}

          {field.type === "textarea" && (
            <Textarea
              id={field.key}
              value={formData[field.key] ?? ""}
              onChange={(e) => handleChange(field.key, e.target.value)}
              placeholder={field.placeholder}
              required={field.required}
              className="min-h-[100px] resize-y text-sm"
            />
          )}

          {field.type === "text" && (
            <Input
              id={field.key}
              type="text"
              value={formData[field.key] ?? ""}
              onChange={(e) => handleChange(field.key, e.target.value)}
              placeholder={field.placeholder}
              required={field.required}
              className="text-sm"
            />
          )}

          {field.type === "number" && (
            <Input
              id={field.key}
              type="number"
              value={formData[field.key] ?? ""}
              onChange={(e) => handleChange(field.key, e.target.value)}
              placeholder={field.placeholder}
              required={field.required}
              className="text-sm"
            />
          )}

          {field.type === "url" && (
            <Input
              id={field.key}
              type="url"
              value={formData[field.key] ?? ""}
              onChange={(e) => handleChange(field.key, e.target.value)}
              placeholder={field.placeholder}
              required={field.required}
              className="text-sm"
            />
          )}

          {field.type === "select" && field.options && (
            <Select
              value={formData[field.key] ?? ""}
              onValueChange={(val) => handleChange(field.key, val)}
            >
              <SelectTrigger id={field.key} className="text-sm">
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent>
                {field.options.map((opt) => (
                  <SelectItem key={opt} value={opt}>
                    {opt}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}

          {field.type === "multitext" && (
            <div className="space-y-2">
              <Textarea
                id={field.key}
                value={formData[field.key] ?? ""}
                onChange={(e) => handleChange(field.key, e.target.value)}
                placeholder={`${field.placeholder ?? "One URL per line"}\nOne per line`}
                className="min-h-[80px] resize-y text-sm font-mono text-xs"
              />
              <p className="text-xs text-stone-400">Enter one item per line</p>
            </div>
          )}
        </div>
      ))}

      <Button
        type="submit"
        disabled={isLoading}
        className="w-full bg-rose-700 hover:bg-rose-800 text-white"
      >
        {isLoading ? "Generating..." : "Generate Brief"}
      </Button>
    </form>
  );
}
