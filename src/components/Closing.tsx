import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus } from "lucide-react";
import { CTA, faq, finalCta, footer, founder, hero, proof } from "../content/home";
import { CONTACT_EMAIL, PRIVACY_URL, SOCIAL, TERMS_URL } from "../lib/config";
import { track } from "../lib/analytics";
import { CtaButton, Logo, Reveal, Section, Sparkle } from "./ui";
import { ctaHref } from "../lib/config";

export function Proof() {
  return (
    <Section name="proof" className="bg-ivory-100 px-5 py-28 sm:px-8 sm:py-36">
      <div className="mx-auto max-w-6xl text-center">
        <Reveal>
          <h2 className="text-4xl font-semibold tracking-tight text-teal-900 sm:text-6xl">{proof.title}</h2>
        </Reveal>
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {proof.results.map((r, i) => (
            <Reveal key={r.stat} delay={i * 0.1}>
              <div className="h-full rounded-3xl bg-teal-900 p-8 text-ivory">
                <p className="gold-text font-serif text-6xl font-bold">{r.stat}</p>
                <p className="mt-3 font-light text-ivory/80">{r.text}</p>
                {r.who && <p className="mt-4 text-sm tracking-widest text-rose-300">{r.who}</p>}
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mx-auto mt-12 max-w-2xl font-serif text-2xl italic text-teal-900">{proof.line}</p>
      </div>
    </Section>
  );
}

export function Founder() {
  return (
    <Section name="founder" className="bg-ivory-100 px-5 py-28 sm:px-8 sm:py-36">
      <div className="mx-auto grid max-w-5xl items-center gap-12 md:grid-cols-[0.8fr_1.2fr]">
        <Reveal>
          {/* Replace the monogram with Tia's headshot at /public/media/tia.jpg */}
          <div className="relative mx-auto aspect-[4/5] w-full max-w-xs">
            <div className="absolute -inset-3 rounded-[2rem] bg-rose-gold opacity-70" />
            <div className="relative grid h-full w-full place-items-center rounded-[1.7rem] bg-teal-900">
              <span className="font-serif text-8xl font-semibold text-rose-300">TC</span>
              <Sparkle size={26} className="absolute right-6 top-6 animate-twinkle text-rose-400" />
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="eyebrow">{founder.role}</p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight text-teal-900 sm:text-5xl">{founder.title}</h2>
          <p className="mt-6 text-xl font-light leading-relaxed text-charcoal/80">{founder.body}</p>
          <p className="mt-8 font-serif text-3xl font-semibold italic text-rose-600">{founder.name}</p>
        </Reveal>
      </div>
    </Section>
  );
}

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <Section id="faq" name="faq" className="bg-ivory px-5 py-28 sm:px-8 sm:py-36">
      <div className="mx-auto max-w-3xl">
        <Reveal className="text-center">
          <p className="eyebrow">FAQ</p>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight text-teal-900 sm:text-6xl">{faq.title}</h2>
        </Reveal>
        <div className="mt-14 divide-y divide-charcoal/10 border-y border-charcoal/10">
          {faq.items.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q}>
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`faq-${i}`}
                    onClick={() => {
                      setOpen(isOpen ? null : i);
                      if (!isOpen) track("faq_open", { question: item.q });
                    }}
                    className="flex w-full items-center justify-between gap-6 py-6 text-left font-serif text-2xl font-semibold text-teal-900 transition hover:text-rose-600"
                  >
                    {item.q}
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-rose-400/50 text-rose-500">
                      {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                    </span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 pr-12 text-lg font-light leading-relaxed text-charcoal/75">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}

export function FinalCta() {
  return (
    <Section name="final_cta" className="grain overflow-hidden bg-teal-950 px-5 py-32 text-center text-ivory sm:px-8 sm:py-44">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[34rem] w-[48rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-rose-500/20 blur-[140px]" />
      <div className="relative mx-auto max-w-4xl">
        <Reveal>
          <Sparkle size={26} className="mx-auto animate-twinkle text-rose-400" />
          <h2 className="mt-6 text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            {finalCta.title}
          </h2>
          <div className="mt-12">
            <CtaButton location="final" className="!px-10 !py-4 !text-lg" />
          </div>
          <p className="mt-8 text-sm font-light tracking-[0.2em] text-ivory/50">{hero.friction.join("  ").toUpperCase()}</p>
        </Reveal>
      </div>
    </Section>
  );
}

export function Footer() {
  const social = Object.entries(SOCIAL).filter(([, url]) => url);
  return (
    <footer className="bg-charcoal-900 px-5 pb-28 pt-16 text-ivory/70 sm:px-8 md:pb-12">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-4 font-serif text-xl italic text-rose-300">{footer.tagline}</p>
        </div>
        <nav aria-label="Footer" className="flex flex-col gap-3 text-sm">
          {footer.links.map((l) => (
            <a key={l.href} href={l.href} className="transition hover:text-rose-300">
              {l.label}
            </a>
          ))}
          {CONTACT_EMAIL && (
            <a href={`mailto:${CONTACT_EMAIL}`} className="transition hover:text-rose-300">
              Contact
            </a>
          )}
          {PRIVACY_URL && (
            <a href={PRIVACY_URL} className="transition hover:text-rose-300">
              Privacy
            </a>
          )}
          {TERMS_URL && (
            <a href={TERMS_URL} className="transition hover:text-rose-300">
              Terms
            </a>
          )}
        </nav>
        <div className="flex flex-col gap-3 text-sm">
          {social.map(([name, url]) => (
            <a key={name} href={url} target="_blank" rel="noreferrer" className="transition hover:text-rose-300">
              {name}
            </a>
          ))}
        </div>
      </div>
      <div className="mx-auto mt-12 flex max-w-6xl flex-col gap-1 border-t border-white/10 pt-6 text-xs text-ivory/45 sm:flex-row sm:justify-between">
        <p>{footer.company}</p>
        <p>{footer.copyright}</p>
      </div>
    </footer>
  );
}

/** Mobile-only bar that appears after the visitor scrolls past the hero. */
export function StickyCta() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.9);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 90 }}
          animate={{ y: 0 }}
          exit={{ y: 90 }}
          transition={{ duration: 0.35 }}
          className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-teal-950/90 p-3 backdrop-blur-xl md:hidden"
        >
          <a
            href={ctaHref()}
            onClick={() => track("cta_click", { location: "sticky" })}
            className="btn-primary w-full"
          >
            {CTA}
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
