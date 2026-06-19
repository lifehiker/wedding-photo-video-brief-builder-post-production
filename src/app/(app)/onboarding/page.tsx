import { OnboardingFlow } from "./OnboardingFlow";

export default function OnboardingPage() {
  return (
    <div className="max-w-lg mx-auto">
      <h1 className="text-2xl font-bold text-stone-900 mb-2">Welcome to BriefedWed</h1>
      <p className="text-stone-500 mb-8">Tell us a bit about your workflow — takes 30 seconds.</p>
      <OnboardingFlow />
    </div>
  );
}
