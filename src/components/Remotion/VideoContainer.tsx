"use client";
import { AbsoluteFill, interpolate, OffthreadVideo, Sequence, useCurrentFrame, useVideoConfig, Video } from "remotion";
import QuestionText from "./components/CollegeBasketball/QuestionText";
import Answers from "./components/CollegeBasketball/Answers";
import { VideoData } from "../../lib/types";

interface CollegeBasketballProps {
  videoData: VideoData;
  baseFPS: number | 30;
}

export const CollegeBasketball: React.FC<CollegeBasketballProps> = ({ videoData, baseFPS: BASE_FPS }) => {
  const frame = useCurrentFrame();
  const videoConfig = useVideoConfig();

  // Initial start time for the first question
  const questionDuration = BASE_FPS * 20 + 20; // X seconds (30fps * X)
  const firstQuestionStart = BASE_FPS * 6; // 6 seconds × 30fps = 180 frames
  const delayBetweenQuestions = BASE_FPS * 2.5; // 3s
  // Placeholder background video URL (replace with your own)

  return (
    <AbsoluteFill style={{ flex: 1, backgroundColor: videoData.backgroundColor }}>
      {videoData.backgroundVideoUrl && (
        <OffthreadVideo
          src={videoData.backgroundVideoUrl}
          startFrom={0}
          endAt={3600}
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      )}

      {videoData.quizData.map((item, index) => {
        const questionStart = firstQuestionStart + index * (questionDuration + delayBetweenQuestions);
        return (
          <Sequence
            key={index}
            from={questionStart}
            durationInFrames={questionDuration}>
            <AbsoluteFill>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100vh",
                }}>
                <div className="container-full px-5">
                  <div className="row ">
                    <div className="col-12">
                      <div className=" text-center mb-4">
                        <QuestionText text={item.question} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="container">
                  <Answers
                    answers={item.answers}
                    correctAnswer={item.correctAnswer}
                    // answersStart={frame - questionStart}
                  />
                </div>
              </div>
            </AbsoluteFill>
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
