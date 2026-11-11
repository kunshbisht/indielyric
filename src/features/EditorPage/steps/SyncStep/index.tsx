import { RotateCcw } from "lucide-react";
import { StepHeading } from "../../components/StepHeading";
import AudioPlayer from "../../components/AudioPlayer";
import { useLyricSync } from "./hooks/useLyrics";
import type { SongProject } from "@/types/project";

interface Props {
  project: SongProject;
  setProject: React.Dispatch<React.SetStateAction<SongProject>>;
}

export default function SyncStep({ project, setProject }: Props) {
  const {
    lines,
    timestamps,
    currentTime,
    setCurrentTime,
    completed,
    allCompleted,
    timestampNextLine,
    undoLast,
  } = useLyricSync({ project, setProject });

  const currentLineIndex = timestamps.reduce(
    (activeIndex, timestamp, index) =>
      timestamp.time <= currentTime &&
        (activeIndex === -1 ||
          timestamp.time >= timestamps[activeIndex].time)
        ? index
        : activeIndex,
    -1,
  );

  return (
    <section>
      <StepHeading
        number="03"
        title="Synchronize"
        description="Play the song and press Space whenever a new lyric line starts."
      />

      {project.audioFile && (
        <div className="mt-8">
          <AudioPlayer
            audioFile={project.audioFile}
            onTimeUpdate={setCurrentTime}
            nextLine={lines[currentLineIndex + 1]}
          />
        </div>
      )}

      {/* Progress */}
      <div className="mt-8">
        <div className="mb-2 flex justify-between text-xs text-zinc-500">
          <span>Progress</span>
          <span>{completed} / {lines.length}</span>
        </div>

        <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-violet-500 transition-all"
            style={{
              width: `${lines.length ? (completed / lines.length) * 100 : 0}%`,
            }}
          />
        </div>
      </div>

      {/* Actions */}
      <div className="mt-5 flex gap-3">
        <button
          type="button"
          onClick={timestampNextLine}
          disabled={allCompleted || !project.audioFile}
          className="flex-1 rounded-xl bg-violet-500 py-4 text-sm font-semibold text-white transition hover:bg-violet-400 disabled:opacity-40"
        >
          {allCompleted
            ? "Synchronization complete"
            : "Timestamp next line · Space"}
        </button>

        <button
          type="button"
          onClick={undoLast}
          disabled={completed === 0}
          title="Undo last timestamp"
          className="rounded-xl border border-white/10 px-4 text-zinc-400 transition hover:bg-white/5 hover:text-white disabled:opacity-30"
        >
          <RotateCcw size={18} />
        </button>
      </div>

      {allCompleted && (
        <p className="mt-5 text-center text-sm text-emerald-400">
          All lyrics synchronized. Continue to review your timestamps.
        </p>
      )}
    </section>
  );
}
