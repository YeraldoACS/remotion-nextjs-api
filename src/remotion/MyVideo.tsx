// // remotion/MyVideo.tsx
// import React from "react";
// import { Composition } from "remotion";
// import { CollegeBasketball } from "../components/Remotion/VideoContainer";
// import { VideoData } from "../lib/types";
// import { mockVideos } from "../data/mockData";

// // Pick safe upper‑bounds (e.g. max possible duration, fps)
// const MAX_DURATION = 20 * 30; // 10 minutes @ 30 fps
// const BASE_FPS = 30;

// export const MyVideo: React.FC = () => {
//   return (
//     // <Composition
//     //   id="dynamic-template"
//     //   component={CollegeBasketball as React.FC<{ videoData: VideoData }>}
//     //   durationInFrames={MAX_DURATION}
//     //   fps={BASE_FPS}
//     //   width={1920}
//     //   height={1080}
//     //   // defaultProps only used if you preview without overriding
//     //   defaultProps={{
//     //     videoData: {
//     //       id: "",
//     //       title: "",
//     //       description: "",
//     //       compositionId: "",
//     //       createdAt: "",
//     //       duration: 0,
//     //       fps: BASE_FPS,
//     //       backgroundColor: "#000",
//     //       backgroundVideoUrl: "",
//     //       quizData: [],
//     //     },
//     //   }}
//     // />

//     // <Composition
//     //   id="dynamic-template"
//     //   // 🔥 Tell TypeScript "trust me, it's compatible"
//     //   component={CollegeBasketball as unknown as React.FC<Record<string, unknown>>}
//     //   durationInFrames={MAX_DURATION}
//     //   fps={BASE_FPS}
//     //   width={1920}
//     //   height={1080}
//     //   defaultProps={{
//     //     videoData: {
//     //       id: "",
//     //       title: "",
//     //       description: "",
//     //       compositionId: "",
//     //       createdAt: "",
//     //       duration: 0,
//     //       fps: BASE_FPS,
//     //       backgroundColor: "#000",
//     //       backgroundVideoUrl: "",
//     //       quizData: [],
//     //     },
//     //     baseFPS: BASE_FPS,
//     //   }}
//     // />

//     <>
//       {mockVideos.map((video) => (
//         <Composition
//           id="dynamic-template"
//           // 🔥 Tell TypeScript "trust me, it's compatible"
//           component={CollegeBasketball as unknown as React.FC<Record<string, unknown>>}
//           durationInFrames={video.duration}
//           fps={video.fps}
//           width={1920}
//           height={1080}
//           defaultProps={{
//             videoData: video,
//             baseFPS: BASE_FPS,
//           }}
//         />
//       ))}
//     </>
//   );
// };

// remotion/MyVideo.tsx
import { Composition } from "remotion";
import { MyVideoComponent } from "../components/Remotion/MyVideoComponent";
import { CollegeBasketball } from "../components/Remotion/VideoContainer";
import { mockVideos } from "../data/mockData";
import { VideoData } from "../lib/types";
// * IMPORTANT: import the BS css file here
import "bootstrap/dist/css/bootstrap.min.css";

// Provide default props
// const defaultVideoData: VideoData = {
//   id: "1",
//   compositionId: "sample",
//   title: "Sample Title",
//   description: "This is a sample video.",
//   fps: 30,
//   createdAt: "",
//   duration: 150,
//   backgroundColor: "#ffffff",
//   backgroundVideoUrl: "https://barvanna.com/mrss/content/COLLEGE%20HOOPS%20A%20WITH%20SOUND%20EFFECTS.mp4",
//   quizData: [
//     {
//       question: "What is the capital of USA?",
//       answers: ["New York", "Washington, D.C.", "Los Angeles", "Chicago"],
//       correctAnswer: "Washington, D.C.",
//     },
//   ],
// };

export const MyVideo = () => {
  const BASE_FPS = 30;

  return (
    <>
      {/* <Composition
        id={defaultVideoData.compositionId}
        // 🔥 Tell TypeScript "trust me, it's compatible"
        component={MyVideoComponent as unknown as React.FC<Record<string, unknown>>}
        durationInFrames={defaultVideoData.duration}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          videoData: defaultVideoData,
          baseFPS: BASE_FPS,
        }}
      /> */}
      {/* <Composition
        id={defaultVideoData.compositionId}
        // 🔥 Tell TypeScript "trust me, it's compatible"
        component={CollegeBasketball as unknown as React.FC<Record<string, unknown>>}
        durationInFrames={defaultVideoData.duration}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          videoData: defaultVideoData,
          baseFPS: BASE_FPS,
        }}
      /> */}

      {mockVideos.map((video) => (
        <Composition
          id="dynamic-template"
          // 🔥 Tell TypeScript "trust me, it's compatible"
          component={CollegeBasketball as unknown as React.FC<Record<string, unknown>>}
          durationInFrames={video.duration}
          fps={video.fps}
          width={1920}
          height={1080}
          defaultProps={{
            videoData: video,
            baseFPS: BASE_FPS,
          }}
        />
      ))}


    </>
  );
};
// TODO: REVIEW Rendered video has wrong aspect ratio and layout;  answers appar in column, text color is wrong
// I worked on the layout, tgransitions and styles of the video.
