import decompileFromCanvas from "./lib/canvas/decompile";
import paintOnCanvas from "./lib/canvas/paint";
import { decodeFromLetterArr } from "./lib/enc-dec/decode";
import { encodeToLetter } from "./lib/enc-dec/encode";
import createVideo from "./lib/ffmpeg/createVideo";
import decompileFrame from "./lib/ffmpeg/decompileFrame";

export default function App() {
  return (
    <div className="flex flex-col gap-4">
      <input
        type="file"
        className="border-2 border-black p-2"
        placeholder="Enter text to encode"
        onChange={async (e) => {
          if (!e.target.files) return;
          const file = e.target.files[0];
          const fileContent = await file.arrayBuffer();
          const enc = encodeToLetter(fileContent);
          const painted = await paintOnCanvas(enc);

          const videoUrl = await createVideo(painted);

          const a = document.createElement("a");
          a.href = videoUrl;
          a.download = `${crypto.randomUUID()}-${file.name}.mp4`;
          a.click();
          a.remove();
        }}
      ></input>

      <input
        type="file"
        className="border-2 border-black p-2"
        placeholder="Enter text to encode"
        onChange={async (e) => {
          if (!e.target.files) return;
          const file = e.target.files[0];
          const fileContent = await file.arrayBuffer();
          const blob = new Blob([fileContent], { type: "video/mp4" });
          const blobUrl = URL.createObjectURL(blob);

          const decodePaint = await decompileFrame(blobUrl);

          const byteMap = await decompileFromCanvas(decodePaint);
          const buffer = decodeFromLetterArr(byteMap);

          const a = document.createElement("a");
          a.href = URL.createObjectURL(new Blob([buffer]));
          a.download = file.name.replace(".mp4", "");
          a.click();
          a.remove();
        }}
      ></input>
    </div>
  );
}
