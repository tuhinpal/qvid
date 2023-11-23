import DecodeVid from "./components/decode";
import EncodeVid from "./components/encode";
import { Box, Layout } from "./components/layout";

export default function App() {
  return (
    <Layout>
      <Box
        title="Encode to video"
        description={`Initially, the file is converted into 2-bit binary, resulting in four possible values for each pair of bits. Subsequently, each value is assigned a distinct color. The image's pixels are then painted with the corresponding colors based on the 2-bit values. Finally, all frames are seamlessly stitched together to form a video.`}
      >
        <EncodeVid />
      </Box>

      <Box
        title="Decode from video"
        description={`The video is decompiled into frames. Each frame is then decompiled into a 2-bit binary. The 2-bit binary is then converted into a byte. Finally, all bytes are combined to form the original file.`}
      >
        <DecodeVid />
      </Box>
    </Layout>
  );
}
