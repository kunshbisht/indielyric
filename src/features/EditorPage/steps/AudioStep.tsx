import { useEffect, useState } from "react";
import { ImagePlus, Music2, Upload } from "lucide-react";
import { StepHeading } from "../components/StepHeading";
import {
  extractMetadata,
  type SongMetadata,
} from "@/lib/audio-metadata";
import type { SongProject } from "@/types/project";

interface Props {
  project: SongProject;
  setProject: React.Dispatch<React.SetStateAction<SongProject>>;
}

export default function AudioStep({ project, setProject }: Props) {
  const [coverUrl, setCoverUrl] = useState<string | null>(null);

  const { audioFile, metadata } = project;

  useEffect(() => {
    if (!metadata.cover) {
      setCoverUrl(null);
      return;
    }

    const url = URL.createObjectURL(metadata.cover);
    setCoverUrl(url);

    return () => URL.revokeObjectURL(url);
  }, [metadata.cover]);

  async function handleFileChange(file: File) {
    // Store the audio file immediately
    setProject((current) => ({
      ...current,
      audioFile: file,
    }));

    // Extract and store metadata
    const extracted = await extractMetadata(file);

    setProject((current) => ({
      ...current,
      metadata: extracted,
    }));
  }

  function updateMetadata(
    field: keyof SongMetadata,
    value: string | File | null
  ) {
    setProject((current) => ({
      ...current,
      metadata: {
        ...current.metadata,
        [field]: value,
      },
    }));
  }

  return (
    <section>
      <StepHeading
        number="01"
        title="Add your audio"
        description="Upload your song and provide its metadata."
      />

      <label className="mt-8 flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-white/20 bg-white/2 p-12 transition hover:border-violet-500/60">
        <Upload size={28} className="text-violet-400" />
        <span className="font-medium">Choose an audio file</span>
        <span className="text-xs text-zinc-500">
          MP3, WAV, FLAC or M4A
        </span>

        <input
          type="file"
          accept="audio/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFileChange(file);
          }}
        />
      </label>

      {audioFile && (
        <>
          <div className="mt-4 flex items-center gap-3 rounded-lg bg-white/5 p-4">
            <Music2 className="text-violet-400" size={20} />
            <span className="text-sm">{audioFile.name}</span>
          </div>

          <div className="mt-8 space-y-4">
            <div>
              <h2 className="font-medium">Song information</h2>
              <p className="mt-1 text-xs text-zinc-500">
                Automatically extracted when available. You can edit everything.
              </p>
            </div>

            {/* Album artwork */}
            <div className="flex items-center gap-5">
              <label className="relative flex size-32 shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-xl border border-dashed border-white/20 bg-white/5 transition hover:border-violet-500/60">
                {coverUrl ? (
                  <img
                    src={coverUrl}
                    alt="Album cover"
                    className="size-full object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center gap-2 text-zinc-500">
                    <ImagePlus size={24} />
                    <span className="text-xs">Add cover</span>
                  </div>
                )}

                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) updateMetadata("cover", file);
                  }}
                />
              </label>

              <div>
                <p className="text-sm font-medium">Album artwork</p>
                <p className="mt-1 text-xs text-zinc-500">
                  Extracted from your audio or uploaded manually.
                </p>

                {coverUrl && (
                  <button
                    type="button"
                    onClick={() => updateMetadata("cover", null)}
                    className="mt-3 text-xs text-red-400 hover:text-red-300"
                  >
                    Remove cover
                  </button>
                )}
              </div>
            </div>

            {/* Metadata fields */}
            {(
              [
                ["title", "Title"],
                ["artist", "Artist"],
                ["album", "Album"],
                ["year", "Release year"],
              ] as const
            ).map(([field, label]) => (
              <label key={field} className="block">
                <span className="mb-2 block text-xs text-zinc-400">
                  {label}
                </span>

                <input
                  value={metadata[field]}
                  onChange={(e) =>
                    updateMetadata(field, e.target.value)
                  }
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none focus:border-violet-500"
                />
              </label>
            ))}
          </div>
        </>
      )}
    </section>
  );
}