import { useCurrentFrame, useVideoConfig, spring } from "remotion";

interface scaleType {
  reverse?: boolean | false;
  children: React.ReactNode;
}

const Scale: React.FC<scaleType> = ({ reverse = false, children }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const scale = spring({
    frame,
    fps,
    reverse,
    config: { damping: 100, stiffness: 200, mass: 0.5 },
  });

  return <div style={{ transform: `scale(${scale})`, display: "inline-block" }}>{children}</div>;
};

export default Scale;
