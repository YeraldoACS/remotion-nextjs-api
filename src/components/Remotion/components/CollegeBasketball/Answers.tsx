import { useCurrentFrame, useVideoConfig, spring } from "remotion";

const Answers: React.FC<{ answers: string[]; questionStart: number }> = ({
  answers,
  questionStart,
}) => {
  const frame = useCurrentFrame();
  const videoConfig = useVideoConfig();
  const answerAppearFrame = questionStart + 50; // Answers appear after ~1.5 seconds

  return (
    <div
      className="grid grid-cols-2 gap-4 mt-10"
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gridTemplateRows: "1fr 1fr",
        gap: "20px",
        textAlign: "center",
        fontSize: "30px",
        fontWeight: "bold",
        visibility: frame >= answerAppearFrame ? "visible" : "hidden", // Hide until animation starts
      }}
    >
      {answers.map((answer, index) => {
        const slideIn = spring({
          fps: videoConfig.fps,
          frame: frame - answerAppearFrame - index * 5, // Ensure correct start time
          config: { damping: 15, stiffness: 100 },
        });

        return (
          <div
            key={index}
            style={{
              transform: `translateX(${Math.max(0, 200 - slideIn * 200)}px)`,
              background: "#3498db",
              color: "white",
              padding: "15px",
              borderRadius: "10px",
              opacity: frame >= answerAppearFrame ? 1 : 0, // Fade in when animation starts
              transition: "opacity 0.3s ease-in",
            }}
          >
            {answer}
          </div>
        );
      })}
    </div>
  );
};

export default Answers;
