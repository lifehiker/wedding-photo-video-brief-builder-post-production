"use client";

import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { trackEvent } from "@/lib/analytics";

interface ExportMenuProps {
  briefId: string;
  projectId: string;
  content: string;
  title: string;
  shareToken?: string | null;
  canExport?: boolean;
  onUpgradeNeeded?: () => void;
}

export function ExportMenu({
  briefId,
  projectId,
  content,
  title,
  shareToken,
  canExport = true,
  onUpgradeNeeded,
}: ExportMenuProps) {
  const [shareUrl, setShareUrl] = useState<string | null>(
    shareToken
      ? `${typeof window !== "undefined" ? window.location.origin : ""}/share/${shareToken}`
      : null
  );
  const [copied, setCopied] = useState(false);
  const [isGeneratingLink, setIsGeneratingLink] = useState(false);

  async function handleCopyText() {
    if (!canExport) {
      onUpgradeNeeded?.();
      return;
    }
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    trackEvent("brief_exported", { briefId, method: "copy" });

    // Record export
    await fetch("/api/briefs/record-export", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ briefId }),
    }).catch(() => {});
  }

  function handleDownloadMarkdown() {
    if (!canExport) {
      onUpgradeNeeded?.();
      return;
    }
    const blob = new Blob([content], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${title.replace(/[^a-z0-9]/gi, "-").toLowerCase()}.md`;
    a.click();
    URL.revokeObjectURL(url);
    trackEvent("brief_exported", { briefId, method: "markdown" });
  }

  function handlePrint() {
    if (!canExport) {
      onUpgradeNeeded?.();
      return;
    }
    window.print();
    trackEvent("brief_exported", { briefId, method: "print" });
  }

  async function handleGenerateShareLink() {
    if (!canExport) {
      onUpgradeNeeded?.();
      return;
    }
    setIsGeneratingLink(true);
    try {
      const { generateShareLink } = await import(
        `@/app/(app)/projects/[projectId]/briefs/actions`
      );
      const result = await generateShareLink(briefId, projectId);
      if (result.shareUrl) {
        setShareUrl(result.shareUrl);
        await navigator.clipboard.writeText(result.shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
        trackEvent("share_link_generated", { briefId });
      }
    } catch {
      // Silently fail
    } finally {
      setIsGeneratingLink(false);
    }
  }

  async function handleCopyShareLink() {
    if (shareUrl) {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="inline-flex items-center justify-center gap-2 rounded-md border border-input bg-background px-3 py-1.5 text-sm font-medium hover:bg-accent hover:text-accent-foreground">
        {copied ? "Copied!" : "Export"}
        <svg className="ml-1 w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="m6 9 6 6 6-6" />
        </svg>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem onClick={handleCopyText}>
          Copy to clipboard
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleDownloadMarkdown}>
          Download Markdown
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handlePrint}>
          Print / Save as PDF
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        {shareUrl ? (
          <DropdownMenuItem onClick={handleCopyShareLink}>
            Copy share link
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem onClick={handleGenerateShareLink} disabled={isGeneratingLink}>
            {isGeneratingLink ? "Generating..." : "Generate share link"}
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
