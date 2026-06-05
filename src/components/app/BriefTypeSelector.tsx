"use client";

import { BRIEF_TEMPLATES, BriefType, FREE_BRIEF_TYPES } from "@/lib/brief-templates";
import { cn } from "@/lib/utils";

interface BriefTypeSelectorProps {
  selected?: BriefType;
  onSelect: (type: BriefType) => void;
  isPaidUser?: boolean;
}

export function BriefTypeSelector({ selected, onSelect, isPaidUser = false }: BriefTypeSelectorProps) {
  const types = Object.values(BRIEF_TEMPLATES);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {types.map((template) => {
        const isLocked = !isPaidUser && !FREE_BRIEF_TYPES.includes(template.type);
        const isSelected = selected === template.type;

        return (
          <button
            key={template.type}
            onClick={() => !isLocked && onSelect(template.type)}
            className={cn(
              "relative text-left p-4 rounded-lg border transition-all",
              isSelected
                ? "border-rose-500 bg-rose-50 ring-1 ring-rose-500"
                : "border-stone-200 hover:border-stone-300 bg-white",
              isLocked && "opacity-60 cursor-not-allowed"
            )}
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="text-lg">{template.icon}</span>
              <span className="font-medium text-stone-900 text-sm">{template.label}</span>
              {isLocked && (
                <span className="ml-auto text-xs bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded">
                  Pro
                </span>
              )}
            </div>
            <p className="text-xs text-stone-500 leading-relaxed">{template.description}</p>
          </button>
        );
      })}
    </div>
  );
}
