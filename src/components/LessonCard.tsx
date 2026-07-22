"use client";

import Link from "next/link";
import { useProgress } from "@/components/ProgressProvider";
import type { Lesson } from "@/lib/lessons";

export function LessonCard({ lesson }: { lesson: Lesson }) {
  const { isComplete, ready } = useProgress();
  const done = ready && isComplete(lesson.slug);

  return (
    <Link
      href={`/lessons/${lesson.slug}`}
      className={`lesson-card ${done ? "is-done" : ""}`}
    >
      <div className="lesson-card-top">
        <span className="lesson-num">Lesson {lesson.number}</span>
        <span className={`check-dot ${done ? "on" : ""}`} aria-hidden>
          {done ? "✓" : ""}
        </span>
      </div>
      <h2>{lesson.title}</h2>
      <p>{lesson.summary}</p>
      <div className="lesson-card-meta">
        <span>Week {lesson.week}</span>
        <span>{lesson.duration}</span>
      </div>
    </Link>
  );
}
