import React from "react";
import { useCurrentFrame, interpolateColors } from "remotion";

type HighlightType = {
  children: React.ReactNode;
  targetColor?: string;
};

const HighlightCorrectAnswer: React.FC<HighlightType> = ({ children, targetColor = "#2ecc71" }) => {
  const frame = useCurrentFrame();
  const backgroundColor = interpolateColors(
    frame,
    [0, 30],
    // ["#3498db", "#2ecc71"] // Blue to green
    ["transparent", targetColor] // Blue to green
  );

  return <div style={{ border: `5px solid #fff`, borderRadius: "1rem", backgroundColor, transition: "background-color 1s ease-in-out" }}>{children}</div>;
};

export default HighlightCorrectAnswer;
