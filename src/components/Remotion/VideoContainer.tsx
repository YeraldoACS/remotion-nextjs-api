"use client";
import { AbsoluteFill, interpolate, Sequence, useCurrentFrame, useVideoConfig, Video } from "remotion";
import QuestionText from "./components/CollegeBasketball/QuestionText";
import Answers from "./components/CollegeBasketball/Answers";
import TimestampOverlay from "./components/CollegeBasketball/TimestampOverlay";
import { VideoData } from "../../data/mockData";

interface CollegeBasketballProps {
  videoData: VideoData;
}

export const CollegeBasketball: React.FC<CollegeBasketballProps> = ({ videoData }) => {
  const frame = useCurrentFrame();
  const videoConfig = useVideoConfig();

  // Initial start time for the first question
  const transitionStart = 25;
  const questionDuration = 300; // 10 seconds (30fps * 10)

  // Placeholder background video URL (replace with your own)
  const fps = videoConfig.fps;

  return (
    <AbsoluteFill
      style={{
        flex: 1,
        backgroundColor: videoData.backgroundColor,
        justifyContent: "center",
        alignItems: "center",
      }}>
      {/* Background Video */}
      {videoData.backgroundVideoUrl && videoData.backgroundVideoUrl !== "" ? (
        <Video
          src={videoData.backgroundVideoUrl}
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      ) : (
        ""
      )}

      {/* Overlay Questions & Answers */}
      {videoData.quizData.map((item, index) => {
        const questionStart = transitionStart + index * questionDuration;

        return (
          <Sequence
            key={index}
            from={questionStart}
            durationInFrames={questionDuration}>
            <AbsoluteFill className="flex flex-col items-center justify-center">
              <QuestionText
                realFrames={frame - questionStart}
                text={item.question}
              />
              <Answers
                answers={item.answers}
                questionStart={questionStart}
              />

              {/* Timestamps */}
              <TimestampOverlay
                time={questionStart / fps}
                position="left"
              />
              <TimestampOverlay
                time={questionDuration / fps}
                position="right"
              />
            </AbsoluteFill>
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
