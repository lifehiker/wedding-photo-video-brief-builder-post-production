import { OnboardingFlow } from "./OnboardingFlow";

export default function OnboardingPage() {
  return (
    <div className="max-w-lg mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-stone-900">Welcome to BriefedWed</h1>
        <p className="text-stone-500 mt-1">Tell us a bit about your workflow — takes 30 seconds.</p>
      </div>
      <OnboardingFlow />
    </div>
  );
}
