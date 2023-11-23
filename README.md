# QVid

![file txt](https://github.com/tuhinpal/qvid/assets/51857187/17848901-6e67-439c-b892-d97faea49dc2)


## File to Video Encoder & Decoder - [View Demo](https://qvid.thetuhin.com/)



### Encoding Process:

1. Read the file as binary.
2. Convert the binary to 2-bit binary.
3. There will be 4 possible values.
4. Assign a corresponding color to each value.
5. Paint into a 20x20 block on a canvas.
6. Create some frames.
7. Use client-side FFmpeg to convert the frames into a video.
8. Done.

### Decoding Process:

1. Use client-side FFmpeg to convert the video into frames.
2. Read the frames.
3. Map each corresponding color to its value.
4. Convert 2-bit binary back to binary.
5. Done.

### Metadata:

Each frame contains the 4 colors used in the frame in sequence in first position. This way, theoretically, even if the video gets color-graded, the file can still be decoded by comparing the initial colors of each frame.

### Separator Color:

A black color is used to separate metadata and data. It is also automatically inserted at the end of a frame if that frame is not full.

### Mapping:

```javascript
export const BIT_MAP_LETTERTOBIT = {
  a: "00",
  b: "01",
  c: "10",
  d: "11",
};

export const SPLITTER_LETTER = "e";

// 5 unique contrast colors except white and black
export const COLOR_MAP = {
  a: "#FF0000", // Red
  b: "#00FF00", // Green
  c: "#0000FF", // Blue
  d: "#FFFFFF", // White
  e: "#000000", // Black
};

```

## Crafted by [Tuhin](https://thetuhin.com/) in 2 days! This project won't receive any further updates.
