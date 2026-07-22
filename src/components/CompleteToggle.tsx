"use client";

import { useProgress } from "@/components/ProgressProvider";

export function CompleteToggle({ slug }: { slug: string }) {
  const { isComplete, setComplete, ready } = useProgress();
  const done = ready && isComplete(slug);

  return (
    <button
      type="button"
      className={`complete-toggle ${done ? "is-on" : ""}`}
      onClick={() => setComplete(slug, !done)}
      disabled={!ready}
    >
      <span className="box" aria-hidden>
        {done ? "✓" : ""}
      </span>
      {done ? "Lesson complete — nice work!" : "Mark lesson complete"}
    </button>
  );
}
