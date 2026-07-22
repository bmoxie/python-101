export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-50 text-zinc-900">
      <div className="mx-auto flex min-h-screen max-w-2xl flex-col justify-center px-6 py-16">
        <p className="text-sm font-medium tracking-wide text-emerald-700 uppercase">
          Python 101
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight">
          Learn Python by building things
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-zinc-600">
          Interactive lessons are coming soon. Check off lessons as you go, and
          run small coding challenges right in the browser.
        </p>
        <p className="mt-8 rounded-lg border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-500">
          Setup complete — GitHub + Vercel are connected. Lessons ship next.
        </p>
      </div>
    </main>
  );
}
