import { how } from "../content/home";
import { CtaButton, Reveal, Section } from "./ui";

export default function How() {
  return (
    <Section id="how" name="how_it_works" className="bg-ivory-100 px-5 py-28 sm:px-8 sm:py-36">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">How it works</p>
          <h2 className="mt-4 text-4xl font-semibold leading-[1.05] tracking-tight text-teal-900 sm:text-6xl">
            {how.title}
          </h2>
        </Reveal>

        <div className="relative mt-20 grid gap-6 lg:grid-cols-3">
          <div className="pointer-events-none absolute left-[16%] right-[16%] top-14 hidden h-px bg-gradient-to-r from-transparent via-rose-400/60 to-transparent lg:block" />
          {how.steps.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.14}>
              <div className="relative h-full rounded-3xl border border-rose-400/25 bg-white/70 p-8 shadow-[0_24px_60px_-34px_rgba(15,61,58,0.5)] transition duration-500 hover:-translate-y-1.5 hover:shadow-[0_30px_70px_-30px_rgba(178,112,92,0.55)]">
                <span
                  className="font-serif text-7xl font-bold leading-none text-transparent"
                  style={{ WebkitTextStroke: "1.5px #c48370" }}
                >
                  0{i + 1}
                </span>
                <h3 className="mt-5 text-2xl font-semibold leading-tight text-teal-900">{s.title}</h3>
                <p className="mt-3 font-light leading-relaxed text-charcoal/75">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-24">
          <p className="text-center font-serif text-3xl font-semibold italic text-rose-600">{how.makeItYours.title}</p>
          <div className="mx-auto mt-8 grid max-w-5xl gap-4 md:grid-cols-3">
            {how.makeItYours.cards.map((c) => (
              <div key={c.title} className="rounded-2xl border border-charcoal/10 bg-ivory px-6 py-6">
                <h3 className="text-xl font-semibold text-teal-900">{c.title}</h3>
                <p className="mt-2 text-[0.95rem] font-light leading-relaxed text-charcoal/75">{c.body}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal className="mt-14 text-center">
          <CtaButton location="how_it_works" />
        </Reveal>
      </div>
    </Section>
  );
}
