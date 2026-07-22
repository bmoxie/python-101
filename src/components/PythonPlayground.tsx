"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Playground } from "@/lib/lessons";

type PyodideInterface = {
  runPythonAsync: (code: string) => Promise<unknown>;
  setStdout: (opts: {
    write?: (buf: Uint8Array) => number;
    batched?: (msg: string) => void;
    isatty?: boolean;
  }) => void;
  setStderr: (opts: {
    write?: (buf: Uint8Array) => number;
    batched?: (msg: string) => void;
    isatty?: boolean;
  }) => void;
  setStdin: (opts: { stdin: () => string }) => void;
};

declare global {
  interface Window {
    loadPyodide?: (opts: { indexURL: string }) => Promise<PyodideInterface>;
  }
}

let pyodidePromise: Promise<PyodideInterface> | null = null;

function loadPyodideScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (window.loadPyodide) {
      resolve();
      return;
    }
    const existing = document.querySelector("script[data-pyodide]");
    if (existing) {
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", () =>
        reject(new Error("Failed to load Pyodide")),
      );
      return;
    }
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/pyodide/v0.27.5/full/pyodide.js";
    script.async = true;
    script.dataset.pyodide = "true";
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load Pyodide"));
    document.head.appendChild(script);
  });
}

async function getPyodide(): Promise<PyodideInterface> {
  if (!pyodidePromise) {
    pyodidePromise = (async () => {
      await loadPyodideScript();
      if (!window.loadPyodide) {
        throw new Error("Pyodide failed to initialize");
      }
      return window.loadPyodide({
        indexURL: "https://cdn.jsdelivr.net/pyodide/v0.27.5/full/",
      });
    })();
  }
  return pyodidePromise;
}

export function PythonPlayground({ playground }: { playground: Playground }) {
  const [code, setCode] = useState(playground.starterCode);
  const [output, setOutput] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "running" | "ok" | "err">(
    "idle",
  );
  const [checkMessage, setCheckMessage] = useState<string | null>(null);
  const [engineReady, setEngineReady] = useState(false);
  const lastOutput = useRef("");

  useEffect(() => {
    setCode(playground.starterCode);
    setOutput("");
    setCheckMessage(null);
    setStatus("idle");
    lastOutput.current = "";
  }, [playground.id, playground.starterCode]);

  useEffect(() => {
    let cancelled = false;
    setStatus("loading");
    getPyodide()
      .then(() => {
        if (!cancelled) {
          setEngineReady(true);
          setStatus("idle");
        }
      })
      .catch((err: Error) => {
        if (!cancelled) {
          setStatus("err");
          setOutput(err.message);
        }
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const run = useCallback(async () => {
    setStatus("running");
    setCheckMessage(null);
    setOutput("");
    lastOutput.current = "";

    try {
      const pyodide = await getPyodide();
      const chunks: string[] = [];
      // Use write (not batched): Pyodide's batched handler strips newlines,
      // which glued multiple print() lines into one.
      const decoder = new TextDecoder();
      const capture = (buf: Uint8Array) => {
        chunks.push(decoder.decode(buf));
        return buf.length;
      };
      pyodide.setStdout({ write: capture, isatty: false });
      pyodide.setStderr({ write: capture, isatty: false });

      const inputs = [...(playground.sampleInputs ?? [])];
      let inputIndex = 0;
      pyodide.setStdin({
        stdin: () => {
          if (inputIndex < inputs.length) {
            const value = inputs[inputIndex];
            inputIndex += 1;
            chunks.push(`> ${value}\n`);
            return value;
          }
          return "";
        },
      });

      await pyodide.runPythonAsync(code);
      const text = chunks.join("");
      lastOutput.current = text;
      setOutput(text || "(ran successfully — no printed output)");
      setStatus("ok");
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      lastOutput.current = message;
      setOutput(message);
      setStatus("err");
    }
  }, [code, playground.sampleInputs]);

  const checkAnswer = () => {
    if (!playground.expectIncludes) {
      setCheckMessage("No auto-check on this one — if it runs and looks right, you’re good.");
      return;
    }
    const haystack = (lastOutput.current + "\n" + code).toLowerCase();
    const needle = playground.expectIncludes.toLowerCase();
    if (haystack.includes(needle)) {
      setCheckMessage("Nice — that looks right. Mark the lesson complete when you’re ready.");
    } else {
      setCheckMessage(
        playground.hint ??
          `Hmm, not quite yet. Make sure your output or code includes “${playground.expectIncludes}”.`,
      );
    }
  };

  const busy = status === "loading" || status === "running";

  return (
    <section className="playground">
      <div className="playground-head">
        <h3>{playground.title}</h3>
        <p>{playground.instructions}</p>
        {playground.sampleInputs && playground.sampleInputs.length > 0 && (
          <p className="playground-inputs">
            Sample answers for <code>input()</code>:{" "}
            {playground.sampleInputs.map((v) => (
              <kbd key={v}>{v}</kbd>
            ))}
          </p>
        )}
      </div>

      <label className="sr-only" htmlFor={`code-${playground.id}`}>
        Python code
      </label>
      <textarea
        id={`code-${playground.id}`}
        className="code-editor"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        spellCheck={false}
        rows={Math.min(16, Math.max(8, code.split("\n").length + 2))}
      />

      <div className="playground-actions">
        <button type="button" className="btn btn-primary" onClick={run} disabled={busy || !engineReady}>
          {status === "loading"
            ? "Loading Python…"
            : status === "running"
              ? "Running…"
              : "Run"}
        </button>
        <button
          type="button"
          className="btn btn-ghost"
          onClick={() => {
            setCode(playground.starterCode);
            setOutput("");
            setCheckMessage(null);
            setStatus("idle");
          }}
        >
          Reset
        </button>
        {playground.expectIncludes && (
          <button type="button" className="btn btn-ghost" onClick={checkAnswer}>
            Check my answer
          </button>
        )}
      </div>

      <div
        className={`output ${status === "err" ? "output-err" : ""}`}
        aria-live="polite"
      >
        <span className="output-label">Output</span>
        <pre>{output || "Press Run to see what happens."}</pre>
      </div>

      {checkMessage && <p className="check-msg">{checkMessage}</p>}
    </section>
  );
}
