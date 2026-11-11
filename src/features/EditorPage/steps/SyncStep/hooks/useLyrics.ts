import { useCallback, useEffect, useMemo, useState } from "react";
import type { SongProject } from "@/types/project";

interface Props {
  project: SongProject;
  setProject: React.Dispatch<React.SetStateAction<SongProject>>;
}

export function useLyricSync({ project, setProject }: Props) {
  const [currentTime, setCurrentTime] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const lines = useMemo(
    () => project.lyrics.split("\n").filter(line => line.trim()),
    [project.lyrics]
  );

  const timestamps = project.timestamps;
  const completed = timestamps.length;
  const allCompleted = completed >= lines.length;

  const updateTimestamp = useCallback(
    (index: number, time: number) => {
      if (!Number.isFinite(time) || time < 0) return;

      setProject(current => ({
        ...current,
        timestamps: current.timestamps.map((item, i) =>
          i === index ? { ...item, time } : item
        ),
      }));
    },
    [setProject]
  );

  const timestampNextLine = useCallback(() => {
    if (completed >= lines.length) return;

    setProject(current => ({
      ...current,
      timestamps: [
        ...current.timestamps,
        { text: lines[completed], time: currentTime },
      ],
    }));

    setSelectedIndex(completed);
  }, [completed, currentTime, lines, setProject]);

  const setSelectedToCurrentTime = useCallback(() => {
    if (selectedIndex < completed) {
      updateTimestamp(selectedIndex, currentTime);
      return;
    }

    if (selectedIndex === completed && !allCompleted) {
      setProject(current => ({
        ...current,
        timestamps: [
          ...current.timestamps,
          { text: lines[selectedIndex], time: currentTime },
        ],
      }));
    }
  }, [
    selectedIndex,
    completed,
    currentTime,
    allCompleted,
    lines,
    updateTimestamp,
    setProject,
  ]);

  const undoLast = useCallback(() => {
    if (completed === 0) return;

    setProject(current => ({
      ...current,
      timestamps: current.timestamps.slice(0, -1),
    }));

    setSelectedIndex(Math.max(0, completed - 1));
  }, [completed, setProject]);

  // Keep selection valid if lyrics are changed.
  useEffect(() => {
    setSelectedIndex(index =>
      Math.min(index, Math.max(0, lines.length - 1))
    );
  }, [lines.length]);

  // Space synchronizes the next line.
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target;

      if (
        event.code !== "Space" ||
        event.repeat ||
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        target instanceof HTMLButtonElement ||
        (target instanceof HTMLElement && target.isContentEditable)
      ) {
        return;
      }

      event.preventDefault();
      timestampNextLine();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [timestampNextLine]);

  return {
    lines,
    timestamps,
    currentTime,
    setCurrentTime,
    selectedIndex,
    setSelectedIndex,
    completed,
    allCompleted,
    updateTimestamp,
    timestampNextLine,
    setSelectedToCurrentTime,
    undoLast,
  };
}