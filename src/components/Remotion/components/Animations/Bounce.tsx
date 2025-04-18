import { spring, useCurrentFrame, useVideoConfig, AbsoluteFill } from "remotion";

type BounceType = {
  children: React.ReactNode;
};

const Bounce: React.FC<BounceType> = ({ children }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const bounce = spring({ frame, fps, config: { damping: 3 } });

  return <div style={{ transform: `scale(${bounce})`, fontSize: "5em" }}>{children}</div>;
};

export default Bounce;
