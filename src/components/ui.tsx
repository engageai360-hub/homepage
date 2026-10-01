import { useEffect, useRef, type ReactNode } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { CTA } from "../content/home";
import { ctaHref } from "../lib/config";
import { track } from "../lib/analytics";

export function Reveal({
  children,
  delay = 0,
  className = "",
  y = 28,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function CtaButton({
  location,
  className = "",
}: {
  location: "nav" | "hero" | "how_it_works" | "categories" | "final" | "sticky";
  className?: string;
}) {
  return (
    <a
      href={ctaHref()}
      className={`btn-primary ${className}`}
      onClick={() => track("cta_click", { location })}
    >
      {CTA}
      <ArrowRight size={18} strokeWidth={2.2} />
    </a>
  );
}

/** Fires section_view once when at least 35% of the section has been on screen. */
export function Section({
  id,
  name,
  className = "",
  children,
}: {
  id?: string;
  name: string;
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          track("section_view", { section: name });
          io.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [name]);
  return (
    <section id={id} ref={ref} className={`relative ${className}`}>
      {children}
    </section>
  );
}

export function Sparkle({ className = "", size = 18 }: { className?: string; size?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
      fill="currentColor"
    >
      <path d="M12 0c.6 6.6 4.9 11.4 12 12-7.1.6-11.4 5.4-12 12-.6-6.6-4.9-11.4-12-12C7.1 11.4 11.4 6.6 12 0Z" />
    </svg>
  );
}

export function Logo({ light = true }: { light?: boolean }) {
  return (
    <a href="#top" className="flex items-center gap-3" aria-label="ReelBrand AI home">
      <img src="/logo-square.png" alt="" width={40} height={40} className="h-10 w-10 rounded-xl" />
      <span
        className={`font-serif text-[1.6rem] font-semibold leading-none tracking-tight ${
          light ? "text-ivory" : "text-teal-900"
        }`}
      >
        ReelBrand <span className="gold-text">AI</span>
      </span>
    </a>
  );
}
