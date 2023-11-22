import { BIT_MAP_LETTERTOBIT } from "../constants";

export function decodeFromLetterArr(stringArr: string[]) {
  const mapped = stringArr
    .map(
      (letter) =>
        BIT_MAP_LETTERTOBIT[letter as keyof typeof BIT_MAP_LETTERTOBIT]
    )
    .join("");

  const buffer = new Uint8Array(
    mapped.match(/.{1,8}/g)!.map((byte) => parseInt(byte, 2))
  ).buffer;

  return buffer;
}
