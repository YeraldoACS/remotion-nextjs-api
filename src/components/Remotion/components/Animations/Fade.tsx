import { interpolate, useCurrentFrame, AbsoluteFill } from "remotion";

type FadeType = {
  flow?: "in" | "out";
  children: React.ReactNode;
};

const Fade: React.FC<FadeType> = ({ flow = "in", children }) => {
  const frame = useCurrentFrame();
  const opacityFlow = flow === "in" ? [0, 1] : flow === "out" ? [1, 0] : [0, 1];
  // frame is the object to interpolate. The second args are the animated frame count;
  // you can visualize it as the speed of the animation. The last args is the value of the animation
  // property, in this case, opacity
  const opacity = interpolate(frame, [0, 40], opacityFlow, {
    extrapolateRight: "clamp",
  });

  return <div style={{ opacity, transition: `opacity 1s ease-${flow}` }}>{children}</div>;
};

export default Fade;
