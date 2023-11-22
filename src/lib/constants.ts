export const BIT_MAP_LETTERTOBIT = {
  a: "00",
  b: "01",
  c: "10",
  d: "11",
};

export const SPLITTER_LETTER = "e";

// 17 unique contrast colors except white and black
export const COLOR_MAP = {
  a: "#FF0000", // Red
  b: "#00FF00", // Green
  c: "#0000FF", // Blue
  d: "#FFFFFF", // White
  e: "#000000", // Black
};

export const BIT_MAP_BITTOLETTER = Object.entries(BIT_MAP_LETTERTOBIT).reduce(
  (acc, [key, value]) => {
    acc[value as string] = key;
    return acc;
  },
  {} as Record<string, string>
);

export const BIT_MAP_LETTERS = [
  ...Object.keys(BIT_MAP_LETTERTOBIT),
  SPLITTER_LETTER,
]; // q for white

export const BIT_MAP_LETTERS_LENGTH = BIT_MAP_LETTERS.length;

export const CANVAS_WIDTH = 1280;
export const CANVAS_HEIGHT = 720;

export const BLOCK_SIZE = 20;

export const TOTAL_BLOCKS_IN_ROW = CANVAS_WIDTH / BLOCK_SIZE;
export const TOTAL_BLOCKS_IN_COL = CANVAS_HEIGHT / BLOCK_SIZE;

export const MAX_BLOCK =
  TOTAL_BLOCKS_IN_ROW * TOTAL_BLOCKS_IN_COL - BIT_MAP_LETTERS_LENGTH;

export const FFMPEG_BASEURL = "https://unpkg.com/@ffmpeg/core@0.12.4/dist/esm";

export const VIDEO_FPS = 30;
