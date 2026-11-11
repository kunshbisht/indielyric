
import { create } from "zustand";
import WaveSurfer from "wavesurfer.js";

export interface LyricLine {
  id: string;
  text: string;
  startTime: number | null;
}

interface EditorState {
  audioUrl: string | null;
  audioName: string | null;
  duration: number;
  currentTime: number;
  isPlaying: boolean;
  wavesurfer: WaveSurfer | null;

  lines: LyricLine[];
  activeLineId: string | null;

  setAudio: (url: string, name: string) => void;
  setWaveSurfer: (ws: WaveSurfer | null) => void;
  setDuration: (duration: number) => void;
  setCurrentTime: (time: number) => void;
  setIsPlaying: (playing: boolean) => void;

  setLyrics: (text: string) => void;
  updateLine: (id: string, text: string) => void;
  setTimestamp: (id: string, time: number) => void;
  setActiveLine: (id: string) => void;
}

export const useEditorStore = create<EditorState>((set) => ({
  audioUrl: null,
  audioName: null,
  duration: 0,
  currentTime: 0,
  isPlaying: false,
  wavesurfer: null,

  lines: [],
  activeLineId: null,

  setAudio: (url, name) =>
    set({
      audioUrl: url,
      audioName: name,
      currentTime: 0,
      duration: 0,
      isPlaying: false,
    }),

  setWaveSurfer: (wavesurfer) => set({ wavesurfer }),
  setDuration: (duration) => set({ duration }),
  setCurrentTime: (currentTime) => set({ currentTime }),
  setIsPlaying: (isPlaying) => set({ isPlaying }),

  setLyrics: (text) =>
    set({
      lines: text
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean)
        .map((line) => ({
          id: crypto.randomUUID(),
          text: line,
          startTime: null,
        })),
      activeLineId: null,
    }),

  updateLine: (id, text) =>
    set((state) => ({
      lines: state.lines.map((line) =>
        line.id === id ? { ...line, text } : line
      ),
    })),

  setTimestamp: (id, time) =>
    set((state) => ({
      lines: state.lines.map((line) =>
        line.id === id ? { ...line, startTime: time } : line
      ),
    })),

  setActiveLine: (activeLineId) => set({ activeLineId }),
}));
