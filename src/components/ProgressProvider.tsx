"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { lessons } from "@/lib/lessons";
import {
  countCompleted,
  loadProgress,
  saveProgress,
  type ProgressMap,
} from "@/lib/progress";

type ProgressContextValue = {
  progress: ProgressMap;
  ready: boolean;
  isComplete: (slug: string) => boolean;
  setComplete: (slug: string, complete: boolean) => void;
  completedCount: number;
  total: number;
};

const ProgressContext = createContext<ProgressContextValue | null>(null);

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [progress, setProgress] = useState<ProgressMap>({});
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setProgress(loadProgress());
    setReady(true);
  }, []);

  const setComplete = useCallback((slug: string, complete: boolean) => {
    setProgress((prev) => {
      const next = { ...prev, [slug]: complete };
      saveProgress(next);
      return next;
    });
  }, []);

  const value = useMemo<ProgressContextValue>(() => {
    const slugs = lessons.map((l) => l.slug);
    return {
      progress,
      ready,
      isComplete: (slug: string) => Boolean(progress[slug]),
      setComplete,
      completedCount: countCompleted(progress, slugs),
      total: slugs.length,
    };
  }, [progress, ready, setComplete]);

  return (
    <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>
  );
}

export function useProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx) {
    throw new Error("useProgress must be used inside ProgressProvider");
  }
  return ctx;
}
