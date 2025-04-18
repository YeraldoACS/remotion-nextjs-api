import { useCurrentFrame, useVideoConfig, spring } from "remotion";
import FadeOut from "../Animations/FadeOut";
import { HighlightCorrectAnswer } from "../Animations";
import { useEffect, useState } from "react";

type AnswersType = {
  answers: string[];
  answersStart: number;
  correctAnswer: string;
};

const Answers: React.FC<AnswersType> = ({ answers, answersStart, correctAnswer }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const answerAppearFrame = 10;

  const [fadedAnswers, setFadedAnswers] = useState<number[]>([]);
  const fadeOutFrame = (index: number) => (index + 1) * 5 * fps;

  useEffect(() => {
    answers.forEach((answer, index) => {
      const isCorrect = answer === correctAnswer;
      const fadeOutTime = fadeOutFrame(index);

      if (!isCorrect && frame >= fadeOutTime && !fadedAnswers.includes(index)) {
        setFadedAnswers((prev) => [...prev, index]);
      }
    });
  }, [frame, answers, correctAnswer, fps, answersStart, fadedAnswers]);

  const allWrongAnswersFaded = answers
    .map((a, i) => (a !== correctAnswer ? i : null))
    .filter((i) => i !== null)
    .every((index) => fadedAnswers.includes(index as number));

  return (
    <div
      className="row row-cols-2 g-4 justify-content-center"
      style={{
        visibility: frame >= answerAppearFrame ? "visible" : "hidden",
      }}>
      {answers.map((answer, index) => {
        const delay = index * 2;
        const slideIn = spring({
          fps,
          frame: frame - answerAppearFrame - delay,
          config: { damping: 15, stiffness: 100 },
        });

        const fadeOutTime = fadeOutFrame(index);
        const disappearAfter = 3 * (index + 1) * fps; // every 5s
        const isCorrect = answer === correctAnswer;
        const shouldFadeOut = !isCorrect && frame >= fadeOutTime;

        // TODO: It needs tweaks, it should detect the wrong answer and it's fading out should not depend on the frames I think, but ra
        // rather time passed and answer dissapears which could be randomly

        const showFadeOut = frame >= disappearAfter && !isCorrect;
        const highlightCorrect = frame >= disappearAfter && isCorrect;
        const shouldHighlight = isCorrect && allWrongAnswersFaded;

        const baseAnswerBox = (
          <div
            className="col p-3 text-white rounded text-center"
            style={{
              transform: `translateX(${Math.max(0, 200 - slideIn * 200)}px)`,
              backgroundColor: "#3498db",
              fontSize: "24px",
              fontWeight: "bold",
              opacity: frame >= answerAppearFrame ? 1 : 0, // Fade in when animation starts
              transition: "opacity 0.3s ease-in",
            }}>
            {answer}
          </div>
        );

        if (shouldFadeOut) {
          return <FadeOut key={index}>{baseAnswerBox}</FadeOut>;
        }

        if (shouldHighlight) {
          return <HighlightCorrectAnswer key={index}>{baseAnswerBox}</HighlightCorrectAnswer>;
        }

        return <div key={index}>{baseAnswerBox}</div>;
      })}
    </div>
  );
};

export default Answers;
