import Link from "next/link";
import { NewProjectForm } from "./NewProjectForm";

export default function NewProjectPage() {
  return (
    <div className="max-w-xl">
      <div className="mb-6">
        <Link href="/projects" className="text-sm text-stone-500 hover:text-stone-700">
          ← Back to projects
        </Link>
        <h1 className="text-2xl font-bold text-stone-900 mt-3">New wedding project</h1>
        <p className="text-stone-500 text-sm mt-1">
          Add the basic wedding details. You can add vendors and briefs after.
        </p>
      </div>

      <NewProjectForm />
    </div>
  );
}
