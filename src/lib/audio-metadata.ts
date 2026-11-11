import { parseBlob } from "music-metadata";

export interface SongMetadata {
  title: string;
  artist: string;
  album: string;
  year: string;
  cover: Blob | null;
}

export async function extractMetadata(file: File): Promise<SongMetadata> {
  const metadata = await parseBlob(file);
  const picture = metadata.common.picture?.[0];

  return {
    title: metadata.common.title ?? "",
    artist: metadata.common.artist ?? "",
    album: metadata.common.album ?? "",
    year: metadata.common.year?.toString() ?? "",
    cover: picture
      ? new Blob([Uint8Array.from(picture.data)], {
        type: picture.format,
      })
      : null,
  };
}