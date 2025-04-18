import { interpolate, useCurrentFrame, AbsoluteFill } from "remotion";

type ColorChangeType = {
  children: React.ReactNode;
  targetColor?: string | "#000";
};

const ColorChange: React.FC<ColorChangeType> = ({ children, targetColor = "#000" }) => {
  const frame = useCurrentFrame();
  const color = interpolate(frame, [0, 120], [0, 1]);

  return (
    <div
      style={{
        color: `rgb(${255 * (1 - color)}, 0, ${255 * color})`,
        fontSize: "5em",
      }}>
      {children}
    </div>
  );
};

export default ColorChange;
