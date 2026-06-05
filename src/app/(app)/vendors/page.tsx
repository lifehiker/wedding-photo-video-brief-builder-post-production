"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { VendorForm } from "@/components/app/VendorForm";
import { createVendor, updateVendor, deleteVendor } from "./actions";
import { Input } from "@/components/ui/input";

interface Vendor {
  id: string;
  name: string;
  category: string;
  instagramHandle: string | null;
  website: string | null;
  notes: string | null;
  updatedAt: string;
}

export default function VendorsPage() {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [search, setSearch] = useState("");
  const [showCreate, setShowCreate] = useState(false);
  const [editingVendor, setEditingVendor] = useState<Vendor | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchVendors();
  }, []);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    if (!q) return vendors;
    return vendors.filter(
      (v) =>
        v.name.toLowerCase().includes(q) ||
        v.category.toLowerCase().includes(q) ||
        (v.instagramHandle ?? "").toLowerCase().includes(q)
    );
  }, [search, vendors]);

  async function fetchVendors() {
    const res = await fetch("/api/vendors");
    if (res.ok) {
      const data = await res.json();
      setVendors(data);
    }
  }

  async function handleCreate(formData: FormData) {
    setIsLoading(true);
    try {
      await createVendor(formData);
      setShowCreate(false);
      fetchVendors();
    } finally {
      setIsLoading(false);
    }
  }

  async function handleUpdate(formData: FormData) {
    if (!editingVendor) return;
    setIsLoading(true);
    try {
      await updateVendor(editingVendor.id, formData);
      setEditingVendor(null);
      fetchVendors();
    } finally {
      setIsLoading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this vendor?")) return;
    await deleteVendor(id);
    fetchVendors();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-stone-900">Vendor Library</h1>
          <p className="text-stone-500 text-sm mt-1">
            Reusable vendor directory. Add once, use across every wedding.
          </p>
        </div>
        <Button onClick={() => setShowCreate(true)} className="bg-rose-700 hover:bg-rose-800 text-white">
          Add vendor
        </Button>
      </div>

      <div className="mb-4">
        <Input
          placeholder="Search vendors..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16 border border-dashed border-stone-300 rounded-xl">
          {vendors.length === 0 ? (
            <>
              <p className="text-stone-500 mb-2">No vendors yet</p>
              <p className="text-stone-400 text-sm mb-4">
                Add venues, florists, planners, and other vendors once and reuse them across your wedding projects.
              </p>
              <Button onClick={() => setShowCreate(true)} className="bg-rose-700 hover:bg-rose-800 text-white">
                Add your first vendor
              </Button>
            </>
          ) : (
            <p className="text-stone-500">No vendors match your search.</p>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((vendor) => (
            <div
              key={vendor.id}
              className="bg-white rounded-xl border border-stone-200 p-4"
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-semibold text-stone-900 text-sm">{vendor.name}</h3>
                  <p className="text-xs text-stone-400 mt-0.5">{vendor.category}</p>
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="sm" className="h-7 text-xs" onClick={() => setEditingVendor(vendor)}>
                    Edit
                  </Button>
                  <Button variant="ghost" size="sm" className="h-7 text-xs text-rose-600" onClick={() => handleDelete(vendor.id)}>
                    Del
                  </Button>
                </div>
              </div>
              {vendor.instagramHandle && (
                <p className="text-xs text-stone-500">
                  @{vendor.instagramHandle.replace("@", "")}
                </p>
              )}
              {vendor.website && (
                <a
                  href={vendor.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-rose-600 hover:underline block truncate"
                >
                  {vendor.website.replace("https://", "").replace("http://", "")}
                </a>
              )}
              {vendor.notes && (
                <p className="text-xs text-stone-400 mt-1 line-clamp-1">{vendor.notes}</p>
              )}
            </div>
          ))}
        </div>
      )}

      <Dialog open={showCreate} onOpenChange={setShowCreate}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add vendor</DialogTitle>
          </DialogHeader>
          <VendorForm onSubmit={handleCreate} isLoading={isLoading} />
        </DialogContent>
      </Dialog>

      <Dialog open={!!editingVendor} onOpenChange={() => setEditingVendor(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit vendor</DialogTitle>
          </DialogHeader>
          {editingVendor && (
            <VendorForm
              initialData={editingVendor}
              onSubmit={handleUpdate}
              isLoading={isLoading}
              submitLabel="Update vendor"
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
