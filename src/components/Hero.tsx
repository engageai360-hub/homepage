import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Play, Volume2, VolumeX } from "lucide-react";
import { hero, make } from "../content/home";
import { track } from "../lib/analytics";
import { CtaButton, Section, Sparkle } from "./ui";

type Tile = { kind: "text"; title: string; sample: string; tone: number } | { kind: "video" };

const tones = [
  "from-teal-700 to-teal-900",
  "from-rose-500 to-rose-600 text-teal-950",
  "from-ivory-100 to-ivory-200 text-teal-900",
  "from-teal-800 to-teal-950",
];

const tiles: Tile[] = make.cards.flatMap((c, i): Tile[] => [
  { kind: "text", title: c.title, sample: c.sample, tone: i % tones.length },
  ...(i % 2 === 0 ? ([{ kind: "video" }] as Tile[]) : []),
]);

function WallTile({ tile }: { tile: Tile }) {
  if (tile.kind === "video") {
    return (
      <div className="relative aspect-[9/16] w-full overflow-hidden rounded-2xl border border-rose-400/30">
        <img src="/media/hero-poster.jpg" alt="" className="h-full w-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-teal-950/70 to-transparent" />
        <Play className="absolute bottom-3 left-3 text-ivory/90" size={18} fill="currentColor" />
      </div>
    );
  }
  return (
    <div
      className={`flex aspect-[9/16] w-full flex-col justify-between rounded-2xl border border-white/10 bg-gradient-to-br p-4 ${tones[tile.tone]} ${
        tile.tone === 0 || tile.tone === 3 ? "text-ivory" : ""
      }`}
    >
      <Sparkle size={14} className="opacity-70" />
      <div>
        <p className="font-serif text-lg font-semibold leading-tight">{tile.title}</p>
        <p className="mt-2 text-[0.7rem] font-light leading-snug opacity-75">{tile.sample}</p>
      </div>
    </div>
  );
}

function Wall({ side }: { side: "left" | "right" }) {
  const cols = side === "left" ? [0, 1] : [1, 0];
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-y-0 hidden w-[36%] opacity-[0.42] md:block ${
        side === "left" ? "-left-[4%]" : "-right-[4%]"
      }`}
      style={{
        perspective: "1100px",
        maskImage:
          side === "left"
            ? "linear-gradient(to right, black 30%, transparent 100%)"
            : "linear-gradient(to left, black 30%, transparent 100%)",
        WebkitMaskImage:
          side === "left"
            ? "linear-gradient(to right, black 30%, transparent 100%)"
            : "linear-gradient(to left, black 30%, transparent 100%)",
      }}
    >
      <div
        className="flex h-full gap-4 overflow-hidden"
        style={{ transform: `rotateY(${side === "left" ? 38 : -38}deg) scale(1.05)`, transformStyle: "preserve-3d" }}
      >
        {cols.map((c, idx) => (
          <div key={idx} className="w-1/2 overflow-hidden">
            <div className={`flex flex-col gap-4 ${c === 0 ? "animate-wall-up" : "animate-wall-down"}`}>
              {[...tiles, ...tiles].map((t, i) => (
                <WallTile key={i} tile={tiles[(i + idx * 3) % tiles.length] ?? t} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Hero() {
  const vref = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  const playWithSound = () => {
    const v = vref.current;
    if (!v) return;
    v.currentTime = 0;
    v.muted = false;
    setMuted(false);
    void v.play();
    track("sample_video_play", { location: "hero" });
    v.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const toggleMute = () => {
    const v = vref.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  return (
    <Section name="hero" className="grain overflow-hidden bg-teal-950 pb-20 pt-32 text-ivory sm:pt-40">
      <div id="top" className="absolute top-0" />
      {/* glow */}
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[46rem] w-[46rem] -translate-x-1/2 rounded-full bg-teal-700/30 blur-[140px]" />
      <div className="pointer-events-none absolute -bottom-40 right-[8%] h-[30rem] w-[30rem] rounded-full bg-rose-500/20 blur-[140px]" />

      <Wall side="left" />
      <Wall side="right" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(6,32,29,0.88)_28%,rgba(6,32,29,0.2)_75%)]" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="eyebrow flex items-center gap-3 !text-rose-300"
          >
            <Sparkle size={14} className="animate-twinkle text-rose-400" />
            {hero.eyebrow}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="mt-6 text-[2.6rem] font-semibold leading-[1.02] tracking-tight sm:text-6xl lg:text-[4.4rem]"
          >
            {hero.headline[0]} <span className="gold-text italic">{hero.headline[1]}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.25 }}
            className="mt-6 max-w-xl text-lg font-light leading-relaxed text-ivory/80"
          >
            {hero.subhead}
          </motion.p>

          <motion.ul
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.12, delayChildren: 0.5 } } }}
            className="mt-8 flex flex-wrap gap-x-6 gap-y-1 font-serif text-2xl italic text-rose-300 sm:text-3xl"
          >
            {hero.friction.map((f) => (
              <motion.li
                key={f}
                variants={{ hidden: { opacity: 0, x: -14 }, show: { opacity: 1, x: 0 } }}
              >
                {f}
              </motion.li>
            ))}
          </motion.ul>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.7 }}
            className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4"
          >
            <CtaButton location="hero" />
            <button
              type="button"
              onClick={playWithSound}
              className="group flex items-center gap-3 text-[0.95rem] font-medium text-ivory/90 transition hover:text-rose-300"
            >
              <span className="grid h-11 w-11 place-items-center rounded-full border border-rose-400/50 transition group-hover:bg-rose-400/15">
                <Play size={16} fill="currentColor" className="ml-0.5" />
              </span>
              {hero.secondary}
            </button>
          </motion.div>
        </div>

        {/* phone */}
        <motion.div
          initial={{ opacity: 0, y: 40, rotate: 2 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ duration: 1.1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-[18.5rem]"
        >
          <div className="absolute -inset-8 rounded-[3rem] bg-rose-gold opacity-25 blur-3xl" />
          <div className="relative rounded-[2.6rem] bg-rose-gold p-[3px] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)]">
            <div className="relative overflow-hidden rounded-[2.5rem] bg-teal-950">
              <video
                ref={vref}
                className="aspect-[9/16] w-full object-cover"
                src="/media/hero.mp4"
                poster="/media/hero-poster.jpg"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
              />
              <div className="absolute left-1/2 top-3 h-5 w-20 -translate-x-1/2 rounded-full bg-black/70" />
              <button
                type="button"
                onClick={toggleMute}
                aria-label={muted ? "Unmute video" : "Mute video"}
                className="absolute bottom-4 right-4 grid h-11 w-11 place-items-center rounded-full bg-black/55 text-ivory backdrop-blur transition hover:bg-black/75"
              >
                {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
              </button>
            </div>
          </div>
          <p className="mt-5 text-center text-sm font-light italic tracking-wide text-ivory/70">{hero.caption}</p>
        </motion.div>
      </div>
    </Section>
  );
}
