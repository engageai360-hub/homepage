import { useRef } from "react";
import { Play } from "lucide-react";
import { make } from "../content/home";
import { track } from "../lib/analytics";
import { CtaButton, Reveal, Section, Sparkle } from "./ui";

const stills = [
  "from-teal-700 via-teal-800 to-teal-950",
  "from-rose-500 via-rose-600 to-teal-900",
  "from-teal-600 via-teal-800 to-charcoal-900",
  "from-rose-400 via-teal-800 to-teal-950",
  "from-teal-800 via-teal-900 to-rose-600",
  "from-charcoal to-teal-800",
];

// Only Personal Value Proposition has a finished sample video so far.
const sampleVideo: Record<string, { src: string; poster: string }> = {
  "Personal Value Proposition": { src: "/media/hero.mp4", poster: "/media/hero-poster.jpg" },
};

function Card({ index }: { index: number }) {
  const c = make.cards[index];
  const video = sampleVideo[c.title];
  const ref = useRef<HTMLVideoElement>(null);

  const start = () => {
    void ref.current?.play();
    track("category_sample_play", { category: c.title });
  };
  const stop = () => ref.current?.pause();

  return (
    <article className="group glass flex h-full flex-col overflow-hidden transition duration-500 hover:-translate-y-1.5 hover:border-rose-400/40">
      <div
        className="relative aspect-[4/3] overflow-hidden"
        onMouseEnter={video ? start : undefined}
        onMouseLeave={video ? stop : undefined}
        onClick={video ? start : undefined}
      >
        {video ? (
          <>
            <video
              ref={ref}
              src={video.src}
              poster={video.poster}
              muted
              loop
              playsInline
              preload="none"
              className="h-full w-full object-cover object-top"
            />
            <span className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full bg-black/55 px-3 py-1.5 text-xs text-ivory backdrop-blur">
              <Play size={12} fill="currentColor" /> Watch sample
            </span>
          </>
        ) : (
          <div className={`flex h-full w-full items-center justify-center bg-gradient-to-br ${stills[index]}`}>
            <Sparkle size={36} className="text-rose-300/70" />
            <span className="absolute bottom-3 left-3 rounded-full bg-black/35 px-3 py-1.5 text-xs text-ivory/85 backdrop-blur">
              Sample coming soon
            </span>
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-2xl font-semibold leading-tight text-ivory">{c.title}</h3>
        <p className="mt-2 text-[0.95rem] font-light leading-relaxed text-ivory/75">{c.line}</p>
        <p className="mt-auto pt-5 font-serif text-lg italic leading-snug text-rose-300">&ldquo;{c.sample}&rdquo;</p>
      </div>
    </article>
  );
}

export default function Make() {
  return (
    <Section id="make" name="categories" className="grain overflow-hidden bg-teal-950 py-28 text-ivory sm:py-36">
      <div className="pointer-events-none absolute -right-40 top-20 h-[34rem] w-[34rem] rounded-full bg-rose-500/15 blur-[140px]" />
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="eyebrow !text-rose-300">What you can make</p>
          <h2 className="mt-4 text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">{make.title}</h2>
          <p className="mt-6 text-lg font-light leading-relaxed text-ivory/75 sm:text-xl">{make.subhead}</p>
        </Reveal>
      </div>

      <div className="relative mx-auto mt-16 max-w-6xl">
        <div className="-mb-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-8 lg:grid-cols-3 [&::-webkit-scrollbar]:hidden">
          {make.cards.map((_, i) => (
            <Reveal key={i} delay={(i % 3) * 0.1} className="w-[78vw] shrink-0 snap-center sm:w-auto">
              <Card index={i} />
            </Reveal>
          ))}
        </div>
      </div>

      <Reveal className="relative mt-16 px-5 text-center">
        <p className="font-serif text-2xl italic text-rose-300 sm:text-3xl">{make.closing}</p>
        <div className="mt-8">
          <CtaButton location="categories" />
        </div>
      </Reveal>
    </Section>
  );
}
