import { VIDEO_FPS } from "../constants";
import { initFFMpeg } from "./utils";
import { fetchFile } from "@ffmpeg/util";

export default async function decompileFrame(videoUrl: string) {
  const ffmpeg = await initFFMpeg();

  const id = crypto.randomUUID();

  await ffmpeg.writeFile(`${id}.mp4`, await fetchFile(videoUrl));

  await ffmpeg.exec([
    "-i",
    `${id}.mp4`,
    "-vf",
    `fps=${VIDEO_FPS}`,
    `${id}_%04d.png`,
  ]);

  const allFiles = await ffmpeg.listDir("./");
  const files = allFiles.filter(
    (file) => file.name.endsWith(".png") && file.name.startsWith(id)
  );

  let fileBlobUrls: string[] = [];

  for (let file of files) {
    const fileData = await ffmpeg.readFile(file.name);
    const data = new Uint8Array(fileData as ArrayBuffer);

    const blob = new Blob([data.buffer], { type: "image/png" });

    const url = URL.createObjectURL(blob);

    fileBlobUrls.push(url);
  }

  return fileBlobUrls;
}
