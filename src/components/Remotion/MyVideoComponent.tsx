"use client";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { VideoData } from "../../lib/types";

interface MyVideoComponentProps {
  videoData: VideoData;
  baseFPS: number | 30;
}

export const MyVideoComponent: React.FC<MyVideoComponentProps> = ({ videoData, baseFPS }) => {
  const frame = useCurrentFrame();
  //   const { width, height, fps } = useVideoConfig();

  // Animation values
  const opacity = interpolate(frame, [0, 30, videoData.duration - 30, videoData.duration], [0, 1, 1, 0]);

  const scale = interpolate(frame, [0, 30, videoData.duration - 30, videoData.duration], [0.8, 1, 1, 0.8]);

  return (
    <AbsoluteFill
      style={{
        // backgroundColor: videoData.backgroundColor,
        // color: videoData.textColor,
        justifyContent: "center",
        alignItems: "center",
      }}>
      <div
        style={{
          opacity,
          transform: `scale(${scale})`,
          textAlign: "center",
          padding: 40,
        }}>
        <h1 style={{ fontSize: 60, marginBottom: 30 }}>{videoData.title}</h1>
        <p style={{ fontSize: 30 }}>{videoData.description}</p>
        <div style={{ marginTop: 100 }}>
          <p style={{ fontSize: 24 }}>Frame: {frame}</p>
          <p style={{ fontSize: 24 }}>Duration: {videoData.duration} frames</p>
        </div>
      </div>
    </AbsoluteFill>
  );
};
