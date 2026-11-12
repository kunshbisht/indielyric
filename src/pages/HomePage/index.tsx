
import { Link } from "react-router";
import { motion } from "motion/react";
import {
  AudioWaveform,
  ArrowRight,
  ArrowUpRight,
  Play,
  Sparkles,
  FileAudio,
  Clapperboard,
  Clock3,
  Music2,
} from "lucide-react";

const waveform = [
  18, 30, 45, 25, 55, 75, 40, 30, 65, 90, 50, 35,
  70, 45, 85, 100, 55, 35, 60, 80, 40, 25, 65, 95,
  55, 35, 75, 45, 60, 90, 50, 30, 70, 45, 85, 55,
  25, 65, 95, 50, 35, 75, 45, 60, 85, 40, 25, 55,
];

const features = [
  {
    icon: AudioWaveform,
    number: "01",
    title: "Perfect synchronization",
    description:
      "Synchronize every lyric line with your audio using an intuitive waveform editor.",
  },
  {
    icon: FileAudio,
    number: "02",
    title: "Export your LRC",
    description:
      "Turn your synchronized lyrics into standard LRC files, ready to use anywhere.",
  },
  {
    icon: Clapperboard,
    number: "03",
    title: "Create lyric videos",
    description:
      "Bring your lyrics to life with typography, animations and custom backgrounds.",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#09090d] text-white selection:bg-violet-500/30">

      {/* Navigation */}
      <nav className="relative z-20 mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-10">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="flex size-9 items-center justify-center rounded-xl bg-violet-500">
            <AudioWaveform size={21} />
          </div>
          <span className="text-xl font-bold tracking-tight">
            indie<span className="text-violet-400">lyric</span>
          </span>
        </Link>

        <div className="hidden items-center gap-9 text-sm text-zinc-400 md:flex">
          <a href="#features" className="transition hover:text-white">
            Features
          </a>
          <a href="#how-it-works" className="transition hover:text-white">
            How it works
          </a>
          <a href="#about" className="transition hover:text-white">
            About
          </a>
        </div>

        <Link
          to="/editor"
          className="group flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-violet-200"
        >
          Open editor
          <ArrowUpRight size={16} />
        </Link>
      </nav>

      {/* Hero */}
      <section className="relative px-6 pb-24 pt-20 lg:px-10 lg:pb-32 lg:pt-28">

        {/* Background glow */}
        <div className="pointer-events-none absolute left-1/2 top-0 z-0 h-137.5 w-187.5 -translate-x-1/2 rounded-full bg-violet-700/10 blur-[140px]" />

        <div className="relative z-10 mx-auto max-w-5xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto mb-8 flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/4 px-4 py-2 text-xs text-zinc-300"
          >
            <Sparkles size={14} className="text-violet-400" />
            Your music. Your words. Perfectly in sync.
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl font-semibold leading-[1.08] tracking-[-0.055em] sm:text-7xl lg:text-8xl"
          >
            Make every
            <br />
            word <span className="bg-linear-to-r from-violet-400 via-fuchsia-300 to-violet-500 bg-clip-text text-transparent">count.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mx-auto mt-7 max-w-xl text-base leading-7 text-zinc-400 sm:text-lg"
          >
            Synchronize lyrics, create LRC files and turn your
            music into beautiful lyric videos. All in one place.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Link
              to="/editor"
              className="group flex w-full items-center justify-center gap-3 rounded-full bg-violet-500 px-7 py-4 font-semibold transition hover:bg-violet-400 sm:w-auto"
            >
              Start creating
              <ArrowRight size={18} className="transition group-hover:translate-x-1" />
            </Link>

            <a
              href="#features"
              className="flex items-center gap-2 rounded-full border border-white/10 px-7 py-4 text-sm text-zinc-300 transition hover:border-white/30 hover:bg-white/5"
            >
              Explore features
            </a>
          </motion.div>
        </div>

        {/* Waveform visualization */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="relative mx-auto mt-24 max-w-4xl"
        >
          <div className="rounded-2xl border border-white/10 bg-[#111116]/90 p-5 shadow-2xl shadow-violet-950/20 sm:p-8">
            <div className="mb-7 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-lg bg-violet-500/15 text-violet-400">
                  <Music2 size={20} />
                </div>
                <div>
                  <p className="text-sm font-medium">Your next masterpiece</p>
                  <p className="text-xs text-zinc-500">Lyrics synchronization</p>
                </div>
              </div>
              <span className="rounded-full border border-violet-400/20 bg-violet-400/10 px-3 py-1 text-xs text-violet-300">
                LIVE PREVIEW
              </span>
            </div>

            <div className="relative flex h-28 items-center justify-between gap-0.75 overflow-hidden">
              {waveform.map((height, i) => (
                <div
                  key={i}
                  className={`flex-1 rounded-full ${
                    i < 19 ? "bg-violet-400" : "bg-zinc-700"
                  }`}
                  style={{ height: `${height}%` }}
                />
              ))}

              <div className="absolute bottom-0 left-[40%] top-0 w-px bg-white shadow-[0_0_12px_white]" />
            </div>

            <div className="mt-3 flex justify-between text-[11px] text-zinc-500">
              <span>00:32</span>
              <span>01:16</span>
              <span>02:48</span>
            </div>

            <div className="mt-8 flex items-center justify-between border-t border-white/5 pt-6">
              <div>
                <p className="text-xs text-zinc-500">CURRENT LYRIC</p>
                <p className="mt-2 text-base font-medium sm:text-lg">
                  Every word tells a story.
                </p>
              </div>
              <button
                aria-label="Preview"
                className="flex size-12 items-center justify-center rounded-full bg-violet-500 transition hover:scale-105 hover:bg-violet-400"
              >
                <Play size={19} fill="currentColor" />
              </button>
            </div>
          </div>
          <p className="mt-5 text-center text-xs text-zinc-600">
            A glimpse of what's possible with Indielyric
          </p>
        </motion.div>
      </section>

      {/* Features */}
      <section id="features" className="border-t border-white/5 px-6 py-24 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 max-w-xl">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-violet-400">
              Everything in sync
            </p>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-5xl">
              From audio to
              <span className="text-zinc-500"> visual.</span>
            </h2>
            <p className="mt-5 leading-7 text-zinc-400">
              Everything you need to synchronize, export and
              create. No complicated workflows.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {features.map((feature, i) => {
              const Icon = feature.icon;

              return (
                <motion.div
                  key={feature.number}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="group rounded-2xl border border-white/8 bg-white/2 p-7 transition hover:-translate-y-1 hover:border-violet-400/30 hover:bg-violet-500/4"
                >
                  <div className="mb-12 flex items-center justify-between">
                    <div className="flex size-12 items-center justify-center rounded-xl bg-violet-500/10 text-violet-400">
                      <Icon size={23} />
                    </div>
                    <span className="text-xs text-zinc-600">{feature.number}</span>
                  </div>

                  <h3 className="text-xl font-semibold">
                    {feature.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-zinc-400">
                    {feature.description}
                  </p>

                  <ArrowUpRight
                    size={18}
                    className="mt-8 text-zinc-600 transition group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-violet-400"
                  />
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section
        id="how-it-works"
        className="border-t border-white/5 px-6 py-24 lg:px-10"
      >
        <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-2 md:items-center">
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-violet-400">
              Simple by design
            </p>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-5xl">
              Three steps.
              <br />
              <span className="text-zinc-500">One finished song.</span>
            </h2>
            <div className="mt-10 space-y-7">
              {[
                ["Upload", "Bring your audio file and lyrics."],
                ["Synchronize", "Match every line to the music."],
                ["Export", "Download your LRC or create a lyric video."],
              ].map(([title, description], i) => (
                <div key={title} className="flex gap-5">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-violet-400/30 text-sm text-violet-400">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-medium">{title}</h3>
                    <p className="mt-1 text-sm text-zinc-500">
                      {description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-linear-to-br from-violet-950/60 via-[#17121f] to-[#0d0d12] p-8 sm:p-12">
            <div className="absolute -right-16 -top-16 size-64 rounded-full bg-violet-500/20 blur-[80px]" />
            <div className="relative">
              <Clock3 size={30} className="text-violet-400" />
              <p className="mt-12 text-4xl font-semibold tracking-tight">
                Your music.
                <br />
                Your timing.
                <br />
                <span className="text-violet-400">Your creation.</span>
              </p>
              <Link
                to="/editor"
                className="mt-10 inline-flex items-center gap-2 text-sm font-medium text-white transition hover:text-violet-300"
              >
                Try Indielyric
                <ArrowRight size={17} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About / CTA */}
      <section id="about" className="px-6 pb-24 pt-12 lg:px-10">
        <div className="mx-auto max-w-7xl rounded-3xl border border-violet-400/15 bg-violet-500/[0.07] px-6 py-16 text-center sm:px-12">
          <Sparkles size={26} className="mx-auto text-violet-400" />
          <h2 className="mt-6 text-3xl font-semibold tracking-tight sm:text-5xl">
            Ready to bring your lyrics to life?
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-sm leading-6 text-zinc-400">
            Start synchronizing your music and create something worth watching.
          </p>
          <Link
            to="/editor"
            className="mt-8 inline-flex items-center gap-3 rounded-full bg-violet-500 px-7 py-4 text-sm font-semibold transition hover:bg-violet-400"
          >
            Get started
            <ArrowRight size={17} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 px-6 py-8 lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 sm:flex-row">
          <Link to="/" className="flex items-center gap-2">
            <AudioWaveform size={19} className="text-violet-400" />
            <span className="font-semibold tracking-tight">
              indie<span className="text-violet-400">lyric</span>
            </span>
          </Link>

          <p className="text-xs text-zinc-600">
            Made for the love of music.
          </p>

          <p className="text-xs text-zinc-600">
            © {new Date().getFullYear()} Indielyric
          </p>
        </div>
      </footer>
    </main>
  );
}
