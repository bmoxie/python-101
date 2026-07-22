"use client";

import { useState } from "react";
import { PythonPlayground } from "@/components/PythonPlayground";
import type { StretchGoal } from "@/lib/lessons";

type Mode = "closed" | "explain" | "mini";

export function StretchHelp({ stretch }: { stretch: StretchGoal }) {
  const [mode, setMode] = useState<Mode>("closed");

  return (
    <section className="stretch-block">
      <h2>Stretch (optional)</h2>
      <p className="stretch-prompt">{stretch.prompt}</p>
      <p className="stretch-note">
        Stuck on a word or idea? Tap a button — you don’t need to guess.
      </p>

      <div className="stretch-actions">
        <button
          type="button"
          className={`btn btn-ghost ${mode === "explain" ? "is-active" : ""}`}
          onClick={() => setMode(mode === "explain" ? "closed" : "explain")}
          aria-expanded={mode === "explain"}
        >
          I don’t know what that means
        </button>
        <button
          type="button"
          className={`btn btn-primary ${mode === "mini" ? "is-active" : ""}`}
          onClick={() => setMode(mode === "mini" ? "closed" : "mini")}
          aria-expanded={mode === "mini"}
        >
          Show me a mini lesson
        </button>
      </div>

      {mode === "explain" && (
        <div className="stretch-panel" role="region" aria-label="Plain explanation">
          <h3>In plain English</h3>
          <p>{stretch.explain}</p>
          {stretch.jargon && stretch.jargon.length > 0 && (
            <dl className="jargon-list">
              {stretch.jargon.map((item) => (
                <div key={item.term} className="jargon-item">
                  <dt>{item.term}</dt>
                  <dd>{item.meaning}</dd>
                </div>
              ))}
            </dl>
          )}
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => setMode("mini")}
          >
            Still fuzzy? Open the mini lesson
          </button>
        </div>
      )}

      {mode === "mini" && (
        <div className="stretch-panel" role="region" aria-label="Mini lesson">
          <h3>Mini lesson</h3>
          <ol className="mini-steps">
            {stretch.miniLesson.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
          {stretch.demo && (
            <div className="stretch-demo">
              <PythonPlayground playground={stretch.demo} />
            </div>
          )}
        </div>
      )}
    </section>
  );
}
