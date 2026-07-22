"use client";

import Link from "next/link";
import { useProgress } from "@/components/ProgressProvider";

export function SiteHeader() {
  const { completedCount, total, ready } = useProgress();

  return (
    <header className="site-header">
      <Link href="/" className="brand">
        <span className="brand-mark">Py</span>
        <span className="brand-text">
          <strong>Python 101</strong>
          <em>Quest log</em>
        </span>
      </Link>
      <p className="progress-chip" aria-live="polite">
        {ready ? `${completedCount} / ${total} done` : "…"}
      </p>
    </header>
  );
}
