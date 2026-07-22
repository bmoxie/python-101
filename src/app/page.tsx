import { LessonCard } from "@/components/LessonCard";
import { lessons } from "@/lib/lessons";

export default function Home() {
  const week1 = lessons.filter((l) => l.week === 1);
  const week2 = lessons.filter((l) => l.week === 2);

  return (
    <main>
      <section className="hero">
        <p className="eyebrow">Two-week starter quest</p>
        <h1>Learn Python by making things talk back</h1>
        <p className="hero-lead">
          Eight short lessons. Each one teaches one idea, lets you run real
          Python in the browser, then check it off when it clicks. No installs.
          No slides.
        </p>
        <div className="hero-meta">
          <span className="pill">~15–25 min each</span>
          <span className="pill">Progress saved on this device</span>
          <span className="pill">Games &amp; text adventures vibe</span>
        </div>
      </section>

      <section className="week-block">
        <h2>Week 1 — Speak Python</h2>
        <p className="week-note">print, variables, input, and choices</p>
        <div className="lesson-grid">
          {week1.map((lesson) => (
            <LessonCard key={lesson.slug} lesson={lesson} />
          ))}
        </div>
      </section>

      <section className="week-block">
        <h2>Week 2 — Build power</h2>
        <p className="week-note">loops, lists, functions, then a tiny game</p>
        <div className="lesson-grid">
          {week2.map((lesson) => (
            <LessonCard key={lesson.slug} lesson={lesson} />
          ))}
        </div>
      </section>
    </main>
  );
}
