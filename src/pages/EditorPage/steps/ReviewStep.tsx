import { useState } from "react";
import { Check, RotateCcw, Clock } from "lucide-react";
import { StepHeading } from "../components/StepHeading";
import AudioPlayer from "../components/AudioPlayer";
import type { SongProject } from "@/types/project";

interface Props {
  project: SongProject;
  setProject: React.Dispatch<React.SetStateAction<SongProject>>;
}

function formatTime(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  const centiseconds = Math.floor((seconds % 1) * 100);

  return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}.${String(centiseconds).padStart(2, "0")}`;
}

export default function ReviewStep({ project, setProject }: Props) {
  const [currentTime, setCurrentTime] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const lines = project.lyrics
    .split("\n")
    .filter(line => line.trim());

  const timestamps = project.timestamps;
  const completed = timestamps.length;

  const activeIndex = timestamps.reduce(
    (active, timestamp, index) =>
      timestamp.time <= currentTime &&
        (active === -1 || timestamp.time >= timestamps[active].time)
        ? index
        : active,
    -1,
  );

  function updateTimestamp(index: number, time: number) {
    setProject(current => ({
      ...current,
      timestamps: current.timestamps.map((timestamp, i) =>
        i === index ? { ...timestamp, time } : timestamp,
      ),
    }));
  }

  function resetTimestamps() {
    if (!window.confirm("Reset all synchronized timestamps?")) return;

    setProject(current => ({
      ...current,
      timestamps: [],
    }));
    setSelectedIndex(0);
  }

  return (
    <section>
      <StepHeading
        number="04"
        title="Review & Edit"
        description="Check your synchronization and adjust any timestamps that need correcting."
      />

      {project.audioFile && (
        <div className="mt-8">
          <AudioPlayer
            audioFile={project.audioFile}
            onTimeUpdate={setCurrentTime}
            onSetCurrentTime={(time) => {
              if (timestamps[selectedIndex]) {
                updateTimestamp(selectedIndex, time);
              }
            }}
          />
        </div>
      )}

      {/* Progress */}
      <div className="mt-8 flex items-center justify-between text-xs text-zinc-500">
        <span>{completed} of {lines.length} lines synchronized</span>
        <span>{lines.length - completed} remaining</span>
      </div>

      {/* Lyrics list */}
      <div className="mt-4 overflow-hidden rounded-xl border border-white/10 divide-y divide-white/5">
        {lines.map((line, index) => {
          const timestamp = timestamps[index];
          const isSelected = selectedIndex === index;
          const isActive = activeIndex === index;

          return (
            <div
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={`flex cursor-pointer items-center gap-4 p-4 transition ${isSelected
                  ? "bg-violet-500/10"
                  : "hover:bg-white/3"
                }`}
            >
              <span className="w-6 shrink-0 text-xs text-zinc-600">
                {index + 1}
              </span>

              <div className="min-w-0 flex-1">
                <p className={`text-sm ${isSelected ? "text-white" : "text-zinc-300"
                  }`}>
                  {line}
                </p>

                {isActive && (
                  <span className="mt-1 inline-flex items-center gap-1 text-[10px] text-violet-400">
                    <span className="size-1.5 rounded-full bg-violet-400" />
                    Currently playing
                  </span>
                )}
              </div>

              {timestamp ? (
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={timestamp.time}
                  onClick={e => e.stopPropagation()}
                  onChange={e => {
                    const value = e.target.value;
                    if (value === "") return;

                    const time = Number(value);
                    if (Number.isFinite(time) && time >= 0) {
                      updateTimestamp(index, time);
                    }
                  }}
                  aria-label={`Timestamp for line ${index + 1} in seconds`}
                  className="w-24 rounded-lg border border-white/10 bg-black/30 px-2 py-2 text-right font-mono text-xs text-white outline-none focus:border-violet-500"
                />
              ) : (
                <span className="text-xs text-zinc-600">
                  Not synced
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Selected timestamp */}
      {timestamps[selectedIndex] && (
        <div className="mt-5 flex items-center justify-between rounded-xl border border-white/10 bg-white/3 p-4">
          <div>
            <p className="text-xs text-zinc-500">Selected timestamp</p>
            <p className="mt-1 font-mono text-lg text-white">
              {formatTime(timestamps[selectedIndex].time)}
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-violet-400">
            <Clock size={14} />
            Line {selectedIndex + 1}
          </div>
        </div>
      )}

      {/* Reset */}
      <button
        type="button"
        onClick={resetTimestamps}
        disabled={completed === 0}
        className="mt-5 flex items-center gap-2 text-xs text-zinc-500 transition hover:text-red-400 disabled:opacity-30"
      >
        <RotateCcw size={14} />
        Reset all timestamps
      </button>

      {completed === lines.length && lines.length > 0 && (
        <div className="mt-6 flex items-center gap-2 text-sm text-emerald-400">
          <Check size={16} />
          All lyrics are synchronized.
        </div>
      )}
    </section>
  );
}
