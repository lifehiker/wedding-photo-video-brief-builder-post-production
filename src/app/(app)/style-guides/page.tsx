"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { StyleGuideForm } from "@/components/app/StyleGuideForm";
import { createStyleGuide, updateStyleGuide, deleteStyleGuide } from "./actions";
import { Badge } from "@/components/ui/badge";
import { UpgradeDialog } from "@/components/app/UpgradeDialog";

interface StyleGuide {
  id: string;
  name: string;
  editingStyle: string | null;
  colorPreferences: string | null;
  musicPreferences: string | null;
  pacingNotes: string | null;
  socialCaptionStyle: string | null;
  deliveryDefaults: string | null;
  isDefault: boolean;
  updatedAt: string;
}

export default function StyleGuidesPage() {
  const [guides, setGuides] = useState<StyleGuide[]>([]);
  const [showCreate, setShowCreate] = useState(false);
  const [editingGuide, setEditingGuide] = useState<StyleGuide | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [canCreate, setCanCreate] = useState(false);

  useEffect(() => {
    fetchGuides();
    checkPermissions();
  }, []);

  async function fetchGuides() {
    const res = await fetch("/api/style-guides");
    if (res.ok) {
      const data = await res.json();
      setGuides(data);
    }
  }

  async function checkPermissions() {
    const res = await fetch("/api/user/permissions");
    if (res.ok) {
      const data = await res.json();
      setCanCreate(data.canCreateStyleGuide);
    }
  }

  async function handleCreate(formData: FormData) {
    setIsLoading(true);
    try {
      const result = await createStyleGuide(formData);
      if (result.error === "upgrade_required") {
        setShowUpgrade(true);
        setShowCreate(false);
        return;
      }
      setShowCreate(false);
      fetchGuides();
    } finally {
      setIsLoading(false);
    }
  }

  async function handleUpdate(formData: FormData) {
    if (!editingGuide) return;
    setIsLoading(true);
    try {
      await updateStyleGuide(editingGuide.id, formData);
      setEditingGuide(null);
      fetchGuides();
    } finally {
      setIsLoading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this style guide?")) return;
    await deleteStyleGuide(id);
    fetchGuides();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-stone-900">Style Guides</h1>
          <p className="text-stone-500 text-sm mt-1">
            Saved editing styles applied automatically to new briefs.
          </p>
        </div>
        <Button
          onClick={() => canCreate ? setShowCreate(true) : setShowUpgrade(true)}
          className="bg-rose-700 hover:bg-rose-800 text-white"
        >
          New style guide
        </Button>
      </div>

      {!canCreate && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6 flex items-center justify-between gap-4">
          <p className="text-sm text-amber-800">
            Style guides require a paid plan. Upgrade to save your editing style and apply it to every brief automatically.
          </p>
          <Button size="sm" onClick={() => setShowUpgrade(true)} className="shrink-0 bg-rose-700 hover:bg-rose-800 text-white">
            Upgrade
          </Button>
        </div>
      )}

      {guides.length === 0 ? (
        <div className="text-center py-16 border border-dashed border-stone-300 rounded-xl">
          <p className="text-stone-500 mb-2">No style guides yet</p>
          <p className="text-stone-400 text-sm mb-4">
            Create a style guide with your editing preferences — it&apos;ll be applied to all your briefs automatically.
          </p>
          <Button
            onClick={() => canCreate ? setShowCreate(true) : setShowUpgrade(true)}
            className="bg-rose-700 hover:bg-rose-800 text-white"
          >
            Create style guide
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {guides.map((guide) => (
            <div
              key={guide.id}
              className="bg-white rounded-xl border border-stone-200 p-5"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-stone-900">{guide.name}</h3>
                  {guide.isDefault && (
                    <Badge className="mt-1 text-xs bg-green-50 text-green-700 border-green-200" variant="outline">
                      Default
                    </Badge>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" onClick={() => setEditingGuide(guide)}>
                    Edit
                  </Button>
                  <Button variant="ghost" size="sm" className="text-rose-600" onClick={() => handleDelete(guide.id)}>
                    Delete
                  </Button>
                </div>
              </div>
              <dl className="space-y-1.5 text-sm">
                {guide.editingStyle && (
                  <div>
                    <dt className="text-xs text-stone-400">Editing style</dt>
                    <dd className="text-stone-600 text-xs line-clamp-2">{guide.editingStyle}</dd>
                  </div>
                )}
                {guide.colorPreferences && (
                  <div>
                    <dt className="text-xs text-stone-400">Color</dt>
                    <dd className="text-stone-600 text-xs line-clamp-1">{guide.colorPreferences}</dd>
                  </div>
                )}
                {guide.musicPreferences && (
                  <div>
                    <dt className="text-xs text-stone-400">Music</dt>
                    <dd className="text-stone-600 text-xs line-clamp-1">{guide.musicPreferences}</dd>
                  </div>
                )}
              </dl>
            </div>
          ))}
        </div>
      )}

      <Dialog open={showCreate} onOpenChange={setShowCreate}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create style guide</DialogTitle>
          </DialogHeader>
          <StyleGuideForm onSubmit={handleCreate} isLoading={isLoading} />
        </DialogContent>
      </Dialog>

      <Dialog open={!!editingGuide} onOpenChange={() => setEditingGuide(null)}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit style guide</DialogTitle>
          </DialogHeader>
          {editingGuide && (
            <StyleGuideForm
              initialData={editingGuide}
              onSubmit={handleUpdate}
              isLoading={isLoading}
              submitLabel="Update style guide"
            />
          )}
        </DialogContent>
      </Dialog>

      <UpgradeDialog
        open={showUpgrade}
        onClose={() => setShowUpgrade(false)}
        message="Style guides require a paid plan. Upgrade to create saved style guides that auto-apply to all your briefs."
      />
    </div>
  );
}
