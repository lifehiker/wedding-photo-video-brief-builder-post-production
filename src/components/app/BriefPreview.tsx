"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface BriefPreviewProps {
  content: string;
  onContentChange?: (content: string) => void;
  isEditable?: boolean;
}

export function BriefPreview({ content, onContentChange, isEditable = false }: BriefPreviewProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(content);

  function handleSave() {
    onContentChange?.(editValue);
    setIsEditing(false);
  }

  if (isEditing) {
    return (
      <div className="space-y-3">
        <Textarea
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          className="min-h-[500px] font-mono text-sm resize-y"
        />
        <div className="flex gap-2">
          <Button onClick={handleSave} size="sm" className="bg-rose-700 hover:bg-rose-800 text-white">
            Save Changes
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setEditValue(content);
              setIsEditing(false);
            }}
          >
            Cancel
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      {isEditable && (
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsEditing(true)}
          className="absolute top-3 right-3 z-10"
        >
          Edit
        </Button>
      )}
      <div className="prose prose-stone prose-sm max-w-none bg-white rounded-lg border border-stone-200 p-6 overflow-auto">
        <MarkdownRenderer content={content} />
      </div>
    </div>
  );
}

function MarkdownRenderer({ content }: { content: string }) {
  const lines = content.split("\n");

  return (
    <div className="space-y-2">
      {lines.map((line, i) => {
        if (line.startsWith("# ")) {
          return (
            <h1 key={i} className="text-2xl font-bold text-stone-900 mb-4">
              {line.slice(2)}
            </h1>
          );
        }
        if (line.startsWith("## ")) {
          return (
            <h2 key={i} className="text-lg font-semibold text-stone-800 mt-6 mb-2 border-b border-stone-100 pb-1">
              {line.slice(3)}
            </h2>
          );
        }
        if (line.startsWith("### ")) {
          return (
            <h3 key={i} className="text-base font-semibold text-stone-700 mt-4 mb-1">
              {line.slice(4)}
            </h3>
          );
        }
        if (line.startsWith("- ")) {
          return (
            <li key={i} className="text-sm text-stone-700 ml-4 list-disc">
              <InlineMarkdown text={line.slice(2)} />
            </li>
          );
        }
        if (line.startsWith("---")) {
          return <hr key={i} className="border-stone-200 my-4" />;
        }
        if (line.trim() === "") {
          return <div key={i} className="h-2" />;
        }
        return (
          <p key={i} className="text-sm text-stone-700 leading-relaxed">
            <InlineMarkdown text={line} />
          </p>
        );
      })}
    </div>
  );
}

function InlineMarkdown({ text }: { text: string }) {
  // Parse **bold** and *italic* and `code`
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/);

  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return <strong key={i} className="font-semibold">{part.slice(2, -2)}</strong>;
        }
        if (part.startsWith("*") && part.endsWith("*")) {
          return <em key={i}>{part.slice(1, -1)}</em>;
        }
        if (part.startsWith("`") && part.endsWith("`")) {
          return <code key={i} className="bg-stone-100 px-1 rounded text-xs font-mono">{part.slice(1, -1)}</code>;
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}
