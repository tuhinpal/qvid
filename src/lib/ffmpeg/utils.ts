import { FFmpeg } from "@ffmpeg/ffmpeg";
import { toBlobURL } from "@ffmpeg/util";
import { FFMPEG_BASEURL } from "../constants";

declare global {
  interface Window {
    ffmpeg: FFmpeg;
    ffmpegInitiated: boolean;
  }
}

export async function initFFMpeg() {
  if (!window.ffmpeg) {
    window.ffmpeg = new FFmpeg();
    window.ffmpeg.on("log", ({ message }) => {
      console.log(message);
    });
  }

  if (!window.ffmpegInitiated) {
    await window.ffmpeg.load({
      coreURL: await toBlobURL(
        `${FFMPEG_BASEURL}/ffmpeg-core.js`,
        "text/javascript"
      ),
      wasmURL: await toBlobURL(
        `${FFMPEG_BASEURL}/ffmpeg-core.wasm`,
        "application/wasm"
      ),
    });

    window.ffmpegInitiated = true;
  }

  return window.ffmpeg;
}
