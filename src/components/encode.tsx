import { ArrowUpOnSquareIcon } from "@heroicons/react/24/outline";
import paintOnCanvas from "../lib/canvas/paint";
import { encodeToLetter } from "../lib/enc-dec/encode";
import createVideo from "../lib/ffmpeg/createVideo";
import Button from "./button";
import Process, { ProcessType, useProcess } from "./process";
import { useState } from "react";

export default function EncodeVid() {
  const [isEncoding, setisEncoding] = useState(false);
  const { process, reset, setError, setSuccess, setWorking } = useProcess({
    encode: {
      status: "pending",
      child: "Convert into 2 bits binary",
    },
    paintInCanvas: {
      status: "pending",
      child: "Paint on canvas",
    },
    createVideo: {
      status: "pending",
      child: "Stitch frames together",
    },
    download: {
      status: "pending",
      child: "Get download link",
    },
  } as ProcessType);

  async function encodeFile(file: File) {
    try {
      setisEncoding(true);

      reset();
      setWorking("Converting into 2 bits");
      const fileContent = await file.arrayBuffer();
      const enc = encodeToLetter(fileContent);
      setSuccess("Converted into 2 bits");

      setWorking("Painting on canvas");
      const painted = await paintOnCanvas(enc);
      setSuccess("Painted on canvas");

      setWorking(`Stitching ${painted.length} frames together`);
      const videoUrl = await createVideo(painted);
      setSuccess(`Stitched ${painted.length} frames together`);

      setSuccess(
        <>
          <a
            href={videoUrl}
            download={`${crypto.randomUUID()}-${file.name}.mp4`}
            className="underline"
          >
            Click here
          </a>{" "}
          to download the video
        </>
      );
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setisEncoding(false);
    }
  }

  return (
    <>
      <Button
        isLoading={isEncoding}
        onClick={() => {
          const input = document.createElement("input");
          input.type = "file";
          input.click();
          input.onchange = () => {
            if (!input.files) return;
            encodeFile(input.files[0]);
          };
        }}
        Icon={ArrowUpOnSquareIcon}
      >
        Select file ({">"}200KB)
      </Button>

      <Process data={process} />
    </>
  );
}
