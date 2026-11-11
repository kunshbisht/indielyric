
import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

import AudioStep from "./steps/AudioStep";
import LyricsStep from "./steps/LyricsStep";
import SyncStep from "./steps/SyncStep";
import ReviewStep from "./steps/ReviewStep";
import ExportStep from "./steps/ExportStep";
import { initialProject, type SongProject } from "@/types/project";

const steps = ["Audio", "Lyrics", "Sync", "Review", "Export"];

export default function EditorPage() {
  const [step, setStep] = useState(0);
  const [project, setProject] = useState<SongProject>(initialProject);

  const lines = project.lyrics
    .split("\n")
    .filter((line) => line.trim());

  function next() {
    setStep(current => Math.min(current + 1, 4));
  }

  function back() {
    setStep(current => Math.max(current - 1, 0));
  }

  return (
    <main className="min-h-screen bg-[#09090D] text-white">
      <header className="h-16 border-b border-white/10 px-6 flex items-center gap-5">
        <button onClick={() => window.history.back()}>
          <ArrowLeft size={20} />
        </button>

        <a href="/" className="font-semibold text-lg tracking-tight">
          indie<span className="text-violet-400">lyric</span>
        </a>
      </header>

      <div className="max-w-2xl mx-auto px-5 py-14">
        {/* Progress */}
        <div className="flex gap-2 mb-12">
          {steps.map((label, index) => (
            <div key={label} className="flex-1">
              <div className={`h-1 rounded-full mb-2 ${index <= step ? "bg-violet-500" : "bg-white/10"
                }`} />
              <span className={`text-xs ${index === step ? "text-white" : "text-zinc-600"
                }`}>
                {label}
              </span>
            </div>
          ))}
        </div>

        {/* Current step */}
        <div className="min-h-87.5">
          {[
            <AudioStep key="audio" project={project} setProject={setProject} />,
            <LyricsStep key="lyrics" project={project} setProject={setProject} />,
            <SyncStep key="sync" project={project} setProject={setProject} />,
            <ReviewStep key="review" project={project} setProject={setProject} />,
            <ExportStep key="export" project={project} />,
          ][step]}
        </div>

        {/* Navigation */}
        <div className="mt-12 flex items-center justify-between border-t border-white/10 pt-6">
          <button
            onClick={back}
            disabled={step === 0}
            className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white disabled:opacity-0"
          >
            <ArrowLeft size={16} />
            Back
          </button>

          {step !== 4 && (
            <button
              onClick={next}
              disabled={
                (step === 0 && !project.audioFile?.name) ||
                (step === 1 && lines.length === 0)
              }
              className="flex items-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-medium text-black hover:bg-zinc-200 disabled:opacity-30"
            >
              Continue
              <ArrowRight size={16} />
            </button>
          )}
        </div>
      </div>
    </main>
  );
}
