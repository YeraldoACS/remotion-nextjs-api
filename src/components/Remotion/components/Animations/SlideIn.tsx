import React from "react";
import { interpolate, useCurrentFrame, AbsoluteFill } from "remotion";

type SlideInType = {
  children: React.ReactNode;
  direction?: "LTR" | "RTL" | "TTB" | "BTT"; // Left-to-right, Right-to-left, Top-to-bottom, Bottom-to-top
};

const SlideIn: React.FC<SlideInType> = ({ children, direction = "LTR" }) => {
  const frame = useCurrentFrame();

  // Define the start and end positions based on the direction
  const transformStyle = (() => {
    switch (direction) {
      case "LTR":
        return `translateX(${interpolate(frame, [0, 60], [-100, 0])}%)`;
      case "RTL":
        return `translateX(${interpolate(frame, [0, 60], [100, 0])}%)`;
      case "TTB":
        return `translateY(${interpolate(frame, [0, 60], [-100, 0])}%)`;
      case "BTT":
        return `translateY(${interpolate(frame, [0, 60], [100, 0])}%)`;
      default:
        return "";
    }
  })();

  return <div style={{ transform: transformStyle, fontSize: "5em" }}>{children}</div>;
};

export default SlideIn;
