import { Check } from "lucide-react";
import { different, who } from "../content/home";
import { Reveal, Section } from "./ui";

export function Different() {
  return (
    <Section name="different" className="bg-ivory px-5 py-28 sm:px-8 sm:py-36">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-semibold leading-[1.08] tracking-tight text-teal-900 sm:text-5xl lg:text-6xl">
            {different.title}
          </h2>
        </Reveal>

        <div className="mt-16 grid items-stretch gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-3xl border border-charcoal/10 bg-ivory-100 p-8 sm:p-10">
              <h3 className="text-2xl font-semibold text-charcoal/70">{different.leftTitle}</h3>
              <ol className="mt-6 space-y-3">
                {different.left.map((l, i) => (
                  <li key={l} className="flex items-center gap-4 border-b border-charcoal/10 pb-3 text-lg font-light text-charcoal/60">
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-charcoal/10 text-sm">{i + 1}</span>
                    {l}
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="relative h-full overflow-hidden rounded-3xl bg-teal-900 p-8 text-ivory shadow-[0_40px_90px_-40px_rgba(15,61,58,0.9)] sm:p-10">
              <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-rose-500/25 blur-[90px]" />
              <h3 className="relative text-2xl font-semibold">{different.rightTitle}</h3>
              <ol className="relative mt-6 space-y-4">
                {different.right.map((l) => (
                  <li key={l} className="flex items-center gap-4 rounded-2xl border border-rose-400/30 bg-white/5 px-5 py-4 font-serif text-2xl font-semibold">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-rose-gold text-teal-950">
                      <Check size={18} strokeWidth={3} />
                    </span>
                    {l}
                  </li>
                ))}
              </ol>
              <p className="relative mt-8 font-serif text-3xl italic text-rose-300">{different.rightNote}</p>
            </div>
          </Reveal>
        </div>

        <Reveal className="mx-auto mt-20 max-w-3xl text-center">
          <p className="font-serif text-3xl font-semibold leading-snug text-teal-900 sm:text-4xl">
            {different.closing}
          </p>
        </Reveal>
      </div>
    </Section>
  );
}

export function Who() {
  return (
    <Section name="who" className="grain overflow-hidden bg-teal-800 px-5 py-28 text-ivory sm:px-8 sm:py-36">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(217,160,140,0.18),transparent_60%)]" />
      <div className="relative mx-auto max-w-3xl text-center">
        <Reveal>
          <h2 className="text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">{who.title}</h2>
        </Reveal>
        <div className="mt-10 space-y-6 text-xl font-light leading-relaxed text-ivory/85">
          {who.body.map((p, i) => (
            <Reveal key={i} delay={0.1 + i * 0.12}>
              <p>{p}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
