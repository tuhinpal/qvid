import {
  BIT_MAP_LETTERS,
  BIT_MAP_LETTERS_LENGTH,
  BLOCK_SIZE,
} from "../constants";
import { createCanvas, simplifyColor } from "./utils";

export default async function decompileFromCanvas(imageUrls: string[]) {
  const { canvas, destroy, paintCanvas, clearCanvas } = await createCanvas();

  const ctx = canvas.getContext("2d");
  let data: string[] = [];

  for (const imageUrl of imageUrls) {
    await paintCanvas(imageUrl);

    let colorArray = [];

    if (ctx) {
      const { width, height } = canvas;

      for (let y = 0; y < height; y += BLOCK_SIZE) {
        for (let x = 0; x < width; x += BLOCK_SIZE) {
          // Sample the middle pixel of each block
          const middleX = x + Math.floor(BLOCK_SIZE / 2);
          const middleY = y + Math.floor(BLOCK_SIZE / 2);
          const imageData = ctx.getImageData(middleX, middleY, 3, 3).data;
          const color = simplifyColor(imageData);
          colorArray.push(color);
        }
      }

      const splitterColor = colorArray[BIT_MAP_LETTERS_LENGTH - 1];
      const indexColors = colorArray
        .slice(0, BIT_MAP_LETTERS_LENGTH - 1)
        .reduce((acc, color, idx) => {
          acc[color as string] = BIT_MAP_LETTERS[idx];
          return acc;
        }, {} as Record<string, string>);

      let dataColors = colorArray.slice(BIT_MAP_LETTERS_LENGTH);

      const splitterIndexInData = dataColors.indexOf(splitterColor);
      if (splitterIndexInData >= 0) {
        dataColors = dataColors.slice(0, splitterIndexInData);
      }

      const mapped = dataColors.map((color) => indexColors[color as string]);
      data.push(...mapped);

      clearCanvas();
    }
  }

  destroy();
  return data;
}
