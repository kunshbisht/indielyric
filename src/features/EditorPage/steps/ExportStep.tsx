
import { useMemo, useState } from "react";
import { Check, Download, FileAudio, FileText } from "lucide-react";
import type { SongProject } from "@/types/project";
import { StepHeading } from "../components/StepHeading";

interface Props {
  project: SongProject;
}

function formatLrcTime(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds - minutes * 60;

  return `[${String(minutes).padStart(2, "0")}:${remainingSeconds
    .toFixed(2)
    .padStart(5, "0")}]`;
}

function generateLrc(project: SongProject) {
  const metadata = project.metadata;
  const lines = [...project.timestamps].sort((a, b) => a.time - b.time);

  const header = [
    metadata.title && `[ti:${metadata.title}]`,
    metadata.artist && `[ar:${metadata.artist}]`,
    metadata.album && `[al:${metadata.album}]`,
    metadata.year && `[re:${metadata.year}]`,
  ].filter(Boolean);

  const lyrics = lines.map(
    line => `${formatLrcTime(line.time)}${line.text}`
  );

  return [...header, ...lyrics].join("\n");
}

export default function ExportStep({ project }: Props) {
  const [downloaded, setDownloaded] = useState(false);

  const lrcContent = useMemo(
    () => generateLrc(project),
    [project]
  );

  const completed = project.timestamps.length;
  const total = project.lyrics
    .split("\n")
    .filter(line => line.trim()).length;

  const isComplete = total > 0 && completed === total;

  function handleExport() {
    const blob = new Blob([lrcContent], {
      type: "text/plain;charset=utf-8",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    const filename = (project.metadata.title || "lyrics")
      .replace(/[<>:"/\\|?*]/g, "")
      .trim();

    link.href = url;
    link.download = `${filename || "lyrics"}.lrc`;

    document.body.appendChild(link);
    link.click();
    link.remove();

    URL.revokeObjectURL(url);
    setDownloaded(true);
  }

  return (
    <section>
      <StepHeading
        number="04"
        title="Export your lyrics"
        description="Review your synchronized lyrics and download your LRC file."
      />

      <div className="py-8 text-center">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-500/10 text-violet-400">
          {isComplete ? <Check size={30} /> : <FileText size={30} />}
        </div>

        <h2 className="text-2xl font-semibold">
          {isComplete ? "You're all set." : "Almost there."}
        </h2>

        <p className="mt-2 text-sm text-zinc-500">
          {completed} of {total} lyric lines synchronized.
        </p>
      </div>

      {/* File information */}
      <div className="rounded-xl border border-white/10 bg-white/3 p-5">
        <div className="flex items-center gap-3">
          <FileAudio className="text-violet-400" size={20} />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-white">
              {project.metadata.title || "Untitled"}
            </p>
            <p className="text-xs text-zinc-500">
              {project.metadata.artist || "Unknown artist"}
            </p>
          </div>
          <span className="rounded-md bg-white/5 px-2 py-1 text-xs text-zinc-400">
            .LRC
          </span>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-4 border-t border-white/5 pt-4">
          <div>
            <p className="text-xs text-zinc-500">Lyrics</p>
            <p className="mt-1 text-sm font-medium">{total} lines</p>
          </div>
          <div>
            <p className="text-xs text-zinc-500">Synchronized</p>
            <p className="mt-1 text-sm font-medium">
              {total ? Math.round((completed / total) * 100) : 0}%
            </p>
          </div>
        </div>
      </div>

      {/* Preview */}
      <div className="mt-6">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-sm font-medium">LRC preview</h3>
          <span className="text-xs text-zinc-500">
            {lrcContent.split("\n").length} lines
          </span>
        </div>

        <pre className="max-h-64 overflow-auto rounded-xl border border-white/10 bg-black/30 p-4 font-mono text-xs leading-6 text-zinc-400">
          {lrcContent || "No synchronized lyrics yet."}
        </pre>
      </div>

      {/* Export */}
      <button
        type="button"
        onClick={handleExport}
        disabled={!completed}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-violet-500 px-8 py-4 font-medium text-white transition hover:bg-violet-400 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <Download size={18} />
        Export LRC
      </button>

      {downloaded && (
        <p className="mt-3 text-center text-xs text-emerald-400">
          Your LRC file has been generated.
        </p>
      )}

      {!isComplete && completed > 0 && (
        <p className="mt-3 text-center text-xs text-amber-400">
          Some lines are still missing timestamps.
        </p>
      )}
    </section>
  );
}
