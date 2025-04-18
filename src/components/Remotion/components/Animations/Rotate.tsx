import { interpolate, useCurrentFrame, AbsoluteFill } from "remotion";

type RotateType = {
  children: React.ReactNode;
};

const Rotate: React.FC<RotateType> = ({ children }) => {
  const frame = useCurrentFrame();
  const rotation = interpolate(frame, [0, 120], [0, 360]);

  return <div style={{ transform: `rotate(${rotation}deg)`, fontSize: "5em" }}>{children}</div>;
};

export default Rotate;
