const STORAGE_KEY = "python-101-progress";

export type ProgressMap = Record<string, boolean>;

export function loadProgress(): ProgressMap {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as ProgressMap;
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

export function saveProgress(progress: ProgressMap) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

export function countCompleted(progress: ProgressMap, slugs: string[]) {
  return slugs.filter((slug) => progress[slug]).length;
}
