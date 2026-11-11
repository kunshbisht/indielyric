import type { SongMetadata } from "@/lib/audio-metadata";

export interface LyricTimestamp {
  text: string;
  time: number;
}

export interface SongProject {
  audioFile: File | null;
  metadata: SongMetadata;
  lyrics: string;
  timestamps: LyricTimestamp[];
}

export const initialProject: SongProject = {
  audioFile: null,
  metadata: {
    title: "",
    artist: "",
    album: "",
    year: "",
    cover: null,
  },
  lyrics: "",
  timestamps: [],
};