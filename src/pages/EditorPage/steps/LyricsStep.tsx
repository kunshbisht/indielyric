import { StepHeading } from "../components/StepHeading";
import type { SongProject } from "@/types/project";

interface Props {
  project: SongProject;
  setProject: React.Dispatch<React.SetStateAction<SongProject>>;
}

export default function LyricsStep({ project, setProject }: Props) {
  const lines = project.lyrics.split("\n").filter((line) => line.trim());

  function handleLyricsChange(value: string) {
    setProject((current) => ({
      ...current,
      lyrics: value,
      // Clear timestamps when lyrics change
      timestamps: [],
    }));
  }

  return (
    <section>
      <StepHeading
        number="02"
        title="Add your lyrics"
        description="Paste your lyrics. Each line will be synchronized separately."
      />

      <textarea
        value={project.lyrics}
        onChange={(e) => handleLyricsChange(e.target.value)}
        placeholder={"First line of the song\nSecond line\nThird line..."}
        className="mt-8 h-64 w-full resize-none rounded-xl border border-white/10 bg-white/3 p-5 text-sm leading-7 outline-none placeholder:text-zinc-700 focus:border-violet-500"
      />

      <p className="mt-3 text-xs text-zinc-500">
        {lines.length} lines detected
      </p>
    </section>
  );
}