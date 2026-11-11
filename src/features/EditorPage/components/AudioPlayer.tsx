
import { useEffect, useRef, useState } from "react";
import { Clock, Pause, Play, SkipBack, SkipForward } from "lucide-react";

interface Props {
  audioFile: File;
  onTimeUpdate?: (time: number) => void;
  onDurationChange?: (duration: number) => void;
  nextLine?: string;
  onSetCurrentTime?: (time: number) => void;
}

function formatTime(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);

  return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

export default function AudioPlayer({
  audioFile,
  onTimeUpdate,
  onDurationChange,
  nextLine,
  onSetCurrentTime,
}: Props) {
  const audioRef = useRef<HTMLAudioElement>(null);

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const url = URL.createObjectURL(audioFile);

    audio.src = url;
    audio.load();

    setCurrentTime(0);
    setDuration(0);
    setIsPlaying(false);

    return () => {
      audio.pause();
      audio.removeAttribute("src");
      audio.load();
      URL.revokeObjectURL(url);
    };
  }, [audioFile]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => {
      setCurrentTime(audio.currentTime);
      onTimeUpdate?.(audio.currentTime);
    };

    const updateDuration = () => {
      const duration = audio.duration;
      setDuration(duration);
      onDurationChange?.(duration);
    };
    const updatePlayState = () => setIsPlaying(!audio.paused);

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("play", updatePlayState);
    audio.addEventListener("pause", updatePlayState);
    audio.addEventListener("ended", updatePlayState);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("play", updatePlayState);
      audio.removeEventListener("pause", updatePlayState);
      audio.removeEventListener("ended", updatePlayState);
    };
  }, [onTimeUpdate]);

  function togglePlayback() {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      void audio.play();
    } else {
      audio.pause();
    }
  }

  function seek(time: number) {
    const audio = audioRef.current;
    if (!audio) return;

    audio.currentTime = time;
    setCurrentTime(time);
    onTimeUpdate?.(time);
  }

  function setCurrentTimeToAudio() {
    const time = audioRef.current?.currentTime ?? 0;
    onSetCurrentTime?.(time);
  }

  return (
    <div className="rounded-xl border border-white/10 bg-white/3 p-5">
      <audio ref={audioRef} preload="metadata" />

      {/* Song information */}
      <div className="flex items-center justify-between gap-4">
        <span className="truncate text-sm font-medium">
          {audioFile.name}
        </span>

        <span className="shrink-0 font-mono text-xs text-zinc-400">
          {formatTime(currentTime)} / {formatTime(duration)}
        </span>
      </div>

      {/* Next lyric */}
      <div className="mt-5 rounded-lg bg-violet-500/10 p-4">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-violet-400">
          Up next
        </p>

        <p className="mt-2 min-h-6 text-sm font-medium text-white">
          {nextLine || "All lines synchronized"}
        </p>
      </div>

      {/* Timeline */}
      <div className="mt-5">
        <input
          type="range"
          min={0}
          max={duration || 1}
          step={0.01}
          value={currentTime}
          onChange={e => seek(Number(e.target.value))}
          className="w-full cursor-pointer accent-violet-500"
        />
      </div>

      {/* Controls */}
      <div className="mt-3 flex items-center justify-center gap-6">
        <button
          type="button"
          onClick={() => seek(Math.max(0, currentTime - 5))}
          className="text-zinc-400 transition hover:text-white"
          aria-label="Back 5 seconds"
        >
          <SkipBack size={20} />
        </button>

        <button
          type="button"
          onClick={(e) => {
            togglePlayback();
            e.currentTarget.blur();
          }}
          className="flex size-12 items-center justify-center rounded-full bg-violet-500 text-white transition hover:bg-violet-400"
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? <Pause size={20} /> : <Play size={20} />}
        </button>

        <button
          type="button"
          onClick={() => seek(Math.min(duration, currentTime + 5))}
          className="text-zinc-400 transition hover:text-white"
          aria-label="Forward 5 seconds"
        >
          <SkipForward size={20} />
        </button>

        {
          onSetCurrentTime && <button
            type="button"
            onClick={setCurrentTimeToAudio}
            title="Set timestamp to current audio time"
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-secondary px-3 py-2 text-sm font-medium text-secondary-foreground transition-colors hover:bg-secondary/80 active:scale-[0.98]"
          >
            <Clock size={16} />
            Set to current time
          </button>
        }
      </div>
    </div>
  );
}
