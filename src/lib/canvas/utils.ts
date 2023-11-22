import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../constants";

export async function createCanvas() {
  const canvas = document.createElement("canvas");
  canvas.style.display = "none";
  canvas.width = CANVAS_WIDTH;
  canvas.height = CANVAS_HEIGHT;

  return {
    canvas,
    destroy: () => {
      canvas.remove();
    },
    clearCanvas: () => {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    },
    imageBlobUrl: async () => {
      return await new Promise<string>((resolve) => {
        canvas.toBlob((blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob);
            resolve(url);
          }
        }, "image/png");
      });
    },
    paintCanvas: async (imageUrl: string) => {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        await new Promise((resolve, reject) => {
          const image = new Image();
          image.src = imageUrl;
          image.onload = () => {
            ctx.drawImage(image, 0, 0);
            resolve("done");
          };

          image.onerror = () => {
            reject();
          };
        });
      }
    },
  };
}

export function simplifyColor(imageData: Uint8ClampedArray) {
  let r = imageData[0];
  let g = imageData[1];
  let b = imageData[2];

  // Define thresholds
  const COLOR_THRESHOLD = 100; // Threshold for red, green, blue
  const WHITE_THRESHOLD = 200; // Threshold for white

  // Check for white
  if (r > WHITE_THRESHOLD && g > WHITE_THRESHOLD && b > WHITE_THRESHOLD) {
    return "wa"; // White
  }

  // Check for red, green, blue
  if (r > COLOR_THRESHOLD && r > g && r > b) {
    return "r"; // Red
  } else if (g > COLOR_THRESHOLD && g > r && g > b) {
    return "g"; // Green
  } else if (b > COLOR_THRESHOLD && b > r && b > g) {
    return "b"; // Blue
  }

  return "ba"; // Default to black for non-dominant or low intensity colors
}
