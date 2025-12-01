export default function GridMotion() {
  return (
    <section className="w-full rounded-lg bg-black/95 p-12 text-white shadow-[0_10px_30px_rgba(0,0,0,0.6)]">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-5xl font-extrabold tracking-tight mb-3">Welcome to Viora</h2>
        <p className="text-lg text-gray-200 mb-8 max-w-2xl mx-auto">
          A modern web application built with Next.js, TypeScript, and Tailwind CSS —
          crafted with a premium black & white aesthetic.
        </p>

        <div className="inline-flex items-center gap-3 bg-white/6 p-1 rounded-md">
          <a
            href="/get-started"
            className="inline-block rounded-md bg-white text-black px-5 py-2 font-semibold shadow-sm"
          >
            Get started
          </a>
          <a
            href="/about"
            className="inline-block rounded-md border border-white/20 px-4 py-2 text-sm text-white/90"
          >
            Learn more
          </a>
        </div>
      </div>
    </section>
  );
}
