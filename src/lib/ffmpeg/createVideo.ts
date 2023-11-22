import { VIDEO_FPS } from "../constants";
import { initFFMpeg } from "./utils";
import { fetchFile } from "@ffmpeg/util";

export default async function createVideo(imageUrls: string[], ext = "png") {
  console.log(`Total frames: ${imageUrls.length}`);
  const ffmpeg = await initFFMpeg();

  const id = crypto.randomUUID();

  for (let i = 0; i < imageUrls.length; i++) {
    const paddedIndex = String(i).padStart(4, "0");
    await ffmpeg.writeFile(
      `${id}-${paddedIndex}.${ext}`,
      await fetchFile(imageUrls[i])
    );
  }

  await ffmpeg.exec([
    "-framerate",
    `${VIDEO_FPS}`,
    "-i",
    `${id}-%04d.${ext}`,
    "-c:v",
    "libx264",
    "-preset",
    "fast",
    `${id}.mp4`,
  ]);

  const fileData = await ffmpeg.readFile(`${id}.mp4`);
  const data = new Uint8Array(fileData as ArrayBuffer);

  const blob = new Blob([data.buffer], { type: "video/mp4" });

  const url = URL.createObjectURL(blob);

  return url;
}
