import Link from "next/link";
import { notFound } from "next/navigation";
import { CompleteToggle } from "@/components/CompleteToggle";
import { PythonPlayground } from "@/components/PythonPlayground";
import { StretchHelp } from "@/components/StretchHelp";
import { getAdjacentLessons, getLesson, lessons } from "@/lib/lessons";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return lessons.map((lesson) => ({ slug: lesson.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const lesson = getLesson(slug);
  if (!lesson) return { title: "Lesson not found" };
  return {
    title: `Lesson ${lesson.number}: ${lesson.title} — Python 101`,
    description: lesson.summary,
  };
}

export default async function LessonPage({ params }: PageProps) {
  const { slug } = await params;
  const lesson = getLesson(slug);
  if (!lesson) notFound();

  const { prev, next } = getAdjacentLessons(slug);

  return (
    <article className="lesson-page">
      <nav className="lesson-nav">
        <Link href="/">← All lessons</Link>
        <span>
          Week {lesson.week} · {lesson.duration}
        </span>
      </nav>

      <header className="lesson-hero">
        <p className="eyebrow">Lesson {lesson.number}</p>
        <h1>{lesson.title}</h1>
        <p className="lesson-why">{lesson.why}</p>
      </header>

      <section className="panel">
        <h2>The idea</h2>
        <ul className="teach-list">
          {lesson.teach.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="panel">
        <PythonPlayground playground={lesson.example} />
      </section>

      <section className="panel">
        <PythonPlayground playground={lesson.challenge} />
      </section>

      {lesson.stretch && (
        <section className="panel">
          <StretchHelp stretch={lesson.stretch} />
        </section>
      )}

      <CompleteToggle slug={lesson.slug} />

      <nav className="lesson-nav">
        {prev ? (
          <Link href={`/lessons/${prev.slug}`}>← {prev.title}</Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link href={`/lessons/${next.slug}`}>{next.title} →</Link>
        ) : (
          <Link href="/">Back to quest log →</Link>
        )}
      </nav>
    </article>
  );
}
