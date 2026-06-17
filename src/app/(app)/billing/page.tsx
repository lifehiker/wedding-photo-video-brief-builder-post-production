import { BillingClient } from "./BillingClient";

export default function BillingPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-stone-900 mb-6">Billing</h1>
      <BillingClient />
    </div>
  );
}
