import { useCurrentFrame, interpolate } from "remotion";

type FadeOutType = {
  children: React.ReactNode;
};

const FadeOut: React.FC<FadeOutType> = ({ children }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 30], [1, 0], { extrapolateRight: "clamp" });

  return <div style={{ opacity, transition: "opacity 1s ease-out" }}>{children}</div>;
};

export default FadeOut;
