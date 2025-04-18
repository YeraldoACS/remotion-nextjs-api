import React, { useEffect, useState } from "react";
import { useCurrentFrame, useVideoConfig, spring } from "remotion";
import { Fade, HighlightCorrectAnswer } from "../Animations";
import { CSSProperties } from "react";

type AnswersBaseType = {
  frame: number;
  appearFrame: number;
  answer: string;
  styles?: CSSProperties;
  className?: string | string[];
  slideIn: number;
};

const AnswersBase: React.FC<AnswersBaseType> = ({ frame, appearFrame, answer, slideIn, styles, className = "" }) => {
  const base = (
    <div
      className={`col px-4 py-5 border-4 text-white rounded-4 text-center d-flex justify-content-center align-items-center ${className}`}
      style={{
        transform: `translateX(${Math.max(0, 200 - slideIn * 200)}px)`,
        fontSize: "4rem",
        fontWeight: "bold",
        opacity: frame >= appearFrame ? 1 : 0, // Fade in when animation starts
        transition: "opacity 0.3s ease-in",
        borderColor: "red",
        borderStyle: "solid",
        whiteSpace: "pre-wrap",
        wordWrap: "break-word",
        lineHeight: 1.2,
        ...styles,
      }}>
      <p className="mb-0">{answer}</p>
    </div>
  );

  return base;
};

type AnswersType = {
  answers: string[];
  // answersStart: number;
  correctAnswer: string;
};

const Answers: React.FC<AnswersType> = ({ answers, /*answersStart,*/ correctAnswer }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const appearFrame = 10; // Slide in starts 10 frames after question start

  const [fadedAnswers, setFadedAnswers] = useState<number[]>([]);

  // 1. Identify incorrect answers
  const incorrectAnswerIndices = answers.map((a, i) => (a !== correctAnswer ? i : null)).filter((i): i is number => i !== null);

  // 2. Define fade timings (starting at 12s, every 3s = 90 frames)
  const fadeStartFrame = 12 * fps;
  const fadeInterval = 3.5 * fps;

  useEffect(() => {
    incorrectAnswerIndices.forEach((index, i) => {
      const fadeFrame = fadeStartFrame + i * fadeInterval;
      if (frame >= fadeFrame && !fadedAnswers.includes(index)) {
        setFadedAnswers((prev) => [...prev, index]);
      }
    });
  }, [frame, fadedAnswers, incorrectAnswerIndices, fadeStartFrame]);

  const allWrongAnswersFaded = incorrectAnswerIndices.every((i) => fadedAnswers.includes(i));

  const correctIndex = answers.findIndex((a) => a === correctAnswer);
  const correctHighlightFrame = fadeStartFrame + (incorrectAnswerIndices.length - 1) * fadeInterval + 5;

  return (
    <div
      className="row row-cols-2 gx-4 gy-5 justify-content-center d-flex flex-wrap"
      style={{
        visibility: frame >= appearFrame ? "visible" : "hidden",
      }}>
      {answers.map((answer, index) => {
        const isCorrect = index === correctIndex;

        const delay = index * 2;
        const slideIn = spring({
          fps,
          frame: frame - appearFrame - delay,
          config: { damping: 15, stiffness: 100 },
        });

        const shouldFadeOut = !isCorrect && fadedAnswers.includes(index);
        const shouldHighlight = isCorrect && frame >= correctHighlightFrame;

        if (shouldFadeOut)
          return (
            <Fade
              flow="out"
              key={index}>
              {
                <AnswersBase
                  answer={answer}
                  appearFrame={appearFrame}
                  frame={frame}
                  slideIn={slideIn}
                  styles={{
                    transition: "inherit",
                    opacity: "inherit",
                  }}
                />
              }
            </Fade>
          );
        if (shouldHighlight && allWrongAnswersFaded)
          return (
            <HighlightCorrectAnswer
              targetColor="green"
              key={index}>
              {
                <AnswersBase
                  answer={answer}
                  appearFrame={appearFrame}
                  frame={frame}
                  slideIn={slideIn}
                  styles={{
                    backgroundColor: "inherit",
                    transition: "inherit",
                    border: "unset"
                  }}
                />
              }
            </HighlightCorrectAnswer>
          );

        return (
          <div
            className="answer-element col d-flex"
            key={index}>
            {
              <AnswersBase
                answer={answer}
                appearFrame={appearFrame}
                frame={frame}
                slideIn={slideIn}
                className={"w-100"}
              />
            }
          </div>
        );
      })}
    </div>
  );
};

export default Answers;
