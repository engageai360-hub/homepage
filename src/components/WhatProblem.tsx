import { motion } from "framer-motion";
import { Clapperboard, Lightbulb, Sparkles } from "lucide-react";
import { problem, what } from "../content/home";
import { Reveal, Section, Sparkle } from "./ui";

const icons = [Lightbulb, Clapperboard, Sparkles];

export function What() {
  return (
    <Section id="what" name="what" className="bg-ivory px-5 py-28 sm:px-8 sm:py-36">
      <div className="mx-auto max-w-4xl text-center">
        <Reveal>
          <Sparkle className="mx-auto text-rose-500" size={22} />
          <h2 className="mt-5 text-4xl font-semibold tracking-tight text-teal-900 sm:text-6xl">{what.title}</h2>
        </Reveal>
        <div className="mx-auto mt-10 max-w-2xl space-y-6 text-xl font-light leading-relaxed text-charcoal/80 sm:text-[1.4rem]">
          {what.body.map((p, i) => (
            <Reveal key={i} delay={0.1 + i * 0.12}>
              <p>{p}</p>
            </Reveal>
          ))}
        </div>
        <div className="mx-auto mt-14 grid max-w-2xl grid-cols-3 gap-4">
          {what.pillars.map((p, i) => {
            const Icon = icons[i];
            return (
              <Reveal key={p} delay={0.2 + i * 0.1}>
                <div className="rounded-2xl border border-rose-400/30 bg-white/60 px-3 py-6 shadow-[0_10px_30px_-18px_rgba(15,61,58,0.4)]">
                  <Icon className="mx-auto text-rose-500" size={26} strokeWidth={1.5} />
                  <p className="mt-3 font-serif text-lg font-semibold text-teal-900 sm:text-xl">{p}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </Section>
  );
}

export function Problem() {
  return (
    <Section name="problem" className="grain overflow-hidden bg-charcoal-900 px-5 py-28 text-ivory sm:px-8 sm:py-36">
      <div className="pointer-events-none absolute left-1/2 top-0 h-96 w-[60rem] -translate-x-1/2 rounded-full bg-teal-700/20 blur-[120px]" />
      <div className="relative mx-auto max-w-4xl text-center">
        <Reveal>
          <h2 className="text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">{problem.title}</h2>
          <p className="mt-6 font-serif text-2xl italic text-rose-300 sm:text-3xl">{problem.body}</p>
        </Reveal>

        <div className="mt-16 flex flex-col items-center gap-5">
          {problem.bubbles.map((b, i) => (
            <motion.p
              key={b}
              initial={{ opacity: 0, scale: 0.92, y: 24 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.18, ease: [0.22, 1, 0.36, 1] }}
              className={`glass max-w-md px-7 py-4 text-lg font-light text-ivory/90 sm:text-xl ${
                i % 2 === 0 ? "sm:-translate-x-14 sm:rounded-bl-md" : "sm:translate-x-14 sm:rounded-br-md"
              }`}
            >
              &ldquo;{b}&rdquo;
            </motion.p>
          ))}
        </div>

        <Reveal delay={0.2} className="mx-auto mt-16 max-w-2xl">
          <p className="text-xl font-light leading-relaxed text-ivory/85 sm:text-2xl">{problem.closing}</p>
        </Reveal>
      </div>
    </Section>
  );
}
