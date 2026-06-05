"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { BriefPreview } from "@/components/app/BriefPreview";
import { ExportMenu } from "@/components/app/ExportMenu";
import { UpgradeDialog } from "@/components/app/UpgradeDialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

interface Brief {
  id: string;
  title: string;
  type: string;
  status: string;
  generatedText: string | null;
  shareToken: string | null;
  exportCount: number;
  createdAt: string;
  updatedAt: string;
  project: {
    id: string;
    coupleNames: string;
  };
}

interface UserPermissions {
  canExport: boolean;
  plan: string;
}

export default function BriefDetailPage() {
  const params = useParams();
  const projectId = params.projectId as string;
  const briefId = params.briefId as string;

  const [brief, setBrief] = useState<Brief | null>(null);
  const [permissions, setPermissions] = useState<UserPermissions>({ canExport: true, plan: "free" });
  const [isLoading, setIsLoading] = useState(true);
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [isPolishing, setIsPolishing] = useState(false);
  const [content, setContent] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const [briefRes, permRes] = await Promise.all([
          fetch(`/api/briefs/${briefId}`),
          fetch("/api/user/permissions"),
        ]);
        if (briefRes.ok) {
          const data = await briefRes.json();
          setBrief(data);
          setContent(data.generatedText ?? "");
        }
        if (permRes.ok) {
          const data = await permRes.json();
          setPermissions(data);
        }
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, [briefId]);

  async function handlePolish() {
    if (!content) return;
    setIsPolishing(true);
    try {
      const res = await fetch("/api/briefs/polish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: content }),
      });
      if (res.ok) {
        const data = await res.json();
        setContent(data.polished ?? content);

        // Save the polished text
        const { updateBrief } = await import("../actions");
        const fd = new FormData();
        fd.set("generatedText", data.polished ?? content);
        await updateBrief(briefId, projectId, fd);
      }
    } finally {
      setIsPolishing(false);
    }
  }

  async function handleContentChange(newContent: string) {
    setContent(newContent);
    const { updateBrief } = await import("../actions");
    const fd = new FormData();
    fd.set("generatedText", newContent);
    await updateBrief(briefId, projectId, fd);
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-stone-400">Loading brief...</div>
      </div>
    );
  }

  if (!brief) {
    return (
      <div className="text-center py-20">
        <p className="text-stone-500">Brief not found.</p>
        <Link href={`/projects/${projectId}`} className="text-rose-700 hover:underline text-sm mt-2 inline-block">
          Back to project
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-5">
        <Link
          href={`/projects/${projectId}`}
          className="text-sm text-stone-500 hover:text-stone-700"
        >
          ← {brief.project.coupleNames}
        </Link>
      </div>

      <div className="flex items-start justify-between gap-3 mb-6 flex-wrap">
        <div>
          <h1 className="text-xl font-bold text-stone-900">{brief.title}</h1>
          <div className="flex items-center gap-2 mt-1">
            <Badge variant="outline" className="text-xs">{brief.type.replace(/_/g, " ")}</Badge>
            <Badge variant="outline" className="text-xs">{brief.status}</Badge>
            {brief.exportCount > 0 && (
              <span className="text-xs text-stone-400">
                {brief.exportCount} export{brief.exportCount !== 1 ? "s" : ""}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePolish}
            disabled={isPolishing || !content}
          >
            {isPolishing ? "Polishing..." : "Polish with AI"}
          </Button>
          <ExportMenu
            briefId={briefId}
            projectId={projectId}
            content={content}
            title={brief.title}
            shareToken={brief.shareToken}
            canExport={permissions.canExport}
            onUpgradeNeeded={() => setShowUpgrade(true)}
          />
        </div>
      </div>

      {content ? (
        <BriefPreview
          content={content}
          onContentChange={handleContentChange}
          isEditable={true}
        />
      ) : (
        <div className="text-center py-12 border border-dashed border-stone-300 rounded-xl">
          <p className="text-stone-500">No content generated yet.</p>
        </div>
      )}

      <UpgradeDialog
        open={showUpgrade}
        onClose={() => setShowUpgrade(false)}
      />
    </div>
  );
}
