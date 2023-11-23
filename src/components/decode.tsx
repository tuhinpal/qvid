import { ArrowUpOnSquareIcon } from "@heroicons/react/24/outline";
import Button from "./button";
import Process, { ProcessType, useProcess } from "./process";
import { useState } from "react";
import decompileFrame from "../lib/ffmpeg/decompileFrame";
import decompileFromCanvas from "../lib/canvas/decompile";
import { decodeFromLetterArr } from "../lib/enc-dec/decode";

export default function DecodeVid() {
  const [isDecoding, setisDecoding] = useState(false);
  const { process, reset, setError, setSuccess, setWorking } = useProcess({
    decompile: {
      status: "pending",
      child: "Decompile into frames",
    },
    readFrames: {
      status: "pending",
      child: "Read frames",
    },
    convert: {
      status: "pending",
      child: "Convert into original file",
    },
    download: {
      status: "pending",
      child: "Get download link",
    },
  } as ProcessType);

  async function decodeFile(file: File) {
    try {
      setisDecoding(true);

      reset();

      setWorking("Decompile into frames");
      const fileContent = await file.arrayBuffer();
      const blob = new Blob([fileContent], { type: "video/mp4" });
      const blobUrl = URL.createObjectURL(blob);
      const decodePaint = await decompileFrame(blobUrl);
      setSuccess("Decompiled into frames");

      setWorking(`Reading ${decodePaint.length} frames`);
      const byteMap = await decompileFromCanvas(decodePaint);
      setSuccess(`Read ${decodePaint.length} frames`);

      setWorking("Converting into original file");
      const buffer = decodeFromLetterArr(byteMap);
      setSuccess("Converted into original file");

      const videoUrl = URL.createObjectURL(new Blob([buffer]));

      setSuccess(
        <>
          <a
            href={videoUrl}
            download={file.name.replace(".mp4", "")}
            className="underline"
          >
            Click here
          </a>{" "}
          to download the original file
        </>
      );
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setisDecoding(false);
    }
  }

  return (
    <>
      <Button
        isLoading={isDecoding}
        onClick={() => {
          const input = document.createElement("input");
          input.type = "file";
          input.click();
          input.onchange = () => {
            if (!input.files) return;
            decodeFile(input.files[0]);
          };
        }}
        Icon={ArrowUpOnSquareIcon}
      >
        Select video file to decode
      </Button>

      <Process data={process} />
    </>
  );
}
