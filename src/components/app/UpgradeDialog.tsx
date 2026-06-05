"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface UpgradeDialogProps {
  open: boolean;
  onClose: () => void;
  message?: string;
}

export function UpgradeDialog({ open, onClose, message }: UpgradeDialogProps) {
  const router = useRouter();

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Upgrade to unlock</DialogTitle>
          <DialogDescription>
            {message ??
              "This feature requires a paid plan. Upgrade to Solo or Studio to unlock unlimited projects, exports, style guides, and share links."}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 py-2">
          <div className="bg-stone-50 rounded-lg p-4 space-y-2">
            <h4 className="font-medium text-stone-900">Solo — $39/mo</h4>
            <ul className="text-sm text-stone-600 space-y-1">
              <li>Unlimited projects & briefs</li>
              <li>All 10 brief types</li>
              <li>Unlimited exports</li>
              <li>Saved style guides</li>
              <li>Share links</li>
            </ul>
          </div>
        </div>

        <div className="flex gap-3 mt-2">
          <Button
            onClick={() => {
              router.push("/billing");
              onClose();
            }}
            className="flex-1 bg-rose-700 hover:bg-rose-800 text-white"
          >
            View plans
          </Button>
          <Button variant="outline" onClick={onClose} className="flex-1">
            Maybe later
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
