import { BLOCK_SIZE, COLOR_MAP } from "../constants";
import { createCanvas } from "./utils";

export default async function paintOnCanvas(allChunks: string[][][]) {
  const { canvas, destroy, imageBlobUrl, clearCanvas } = await createCanvas();

  let jpegBlobUrls = [] as string[];

  for (const chunks of allChunks) {
    for (let i = 0; i < chunks.length; i++) {
      const startHeight = i * BLOCK_SIZE;

      for (let j = 0; j < chunks[i].length; j++) {
        const startWidth = j * BLOCK_SIZE;
        const color = COLOR_MAP[chunks[i][j] as keyof typeof COLOR_MAP];
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.fillStyle = color;
          ctx.fillRect(startWidth, startHeight, BLOCK_SIZE, BLOCK_SIZE);
        }
      }
    }

    const jpeg = await imageBlobUrl();
    jpegBlobUrls.push(jpeg);
    clearCanvas();
  }

  destroy();

  return jpegBlobUrls;
}
