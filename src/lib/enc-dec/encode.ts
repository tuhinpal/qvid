import {
  BIT_MAP_BITTOLETTER,
  BIT_MAP_LETTERS,
  MAX_BLOCK,
  SPLITTER_LETTER,
  TOTAL_BLOCKS_IN_ROW,
} from "../constants";

export function encodeToLetter(buffer: any) {
  if (!(buffer instanceof ArrayBuffer)) {
    buffer = new TextEncoder().encode(buffer.toString()).buffer;
  }

  const contents = new Uint8Array(buffer);

  const mapped = Array.from(contents)
    .map((byte) => {
      let byteString = byte.toString(2).padStart(8, "0");
      return [
        BIT_MAP_BITTOLETTER[byteString.substring(0, 2)],
        BIT_MAP_BITTOLETTER[byteString.substring(2, 4)],
        BIT_MAP_BITTOLETTER[byteString.substring(4, 6)],
        BIT_MAP_BITTOLETTER[byteString.substring(6, 8)],
      ];
    })
    .flat();

  let chunks = [] as string[][][];
  for (let i = 0; i < mapped.length; i += MAX_BLOCK) {
    const sliced = mapped.slice(i, i + MAX_BLOCK);

    const chunk = [
      ...BIT_MAP_LETTERS,
      ...sliced,
      ...(sliced.length < MAX_BLOCK ? [SPLITTER_LETTER] : []), // add one splitter if not full, so we know where to stop
    ];

    let chunkChunks = [] as string[][];
    for (let j = 0; j < chunk.length; j += TOTAL_BLOCKS_IN_ROW) {
      chunkChunks.push(chunk.slice(j, j + TOTAL_BLOCKS_IN_ROW));
    }

    chunks.push(chunkChunks);
  }

  return chunks;
}
