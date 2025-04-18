import { useCurrentFrame, AbsoluteFill } from "remotion";

const Typewriter: React.FC = () => {
  const frame = useCurrentFrame();
  const text = "Typewriter Effect";
  const characters = Math.min(frame / 3, text.length);

  return (
    <AbsoluteFill
      style={{ justifyContent: "center", alignItems: "center" }}
      className="bg-blue-950 text-white"
    >
      <div style={{ fontSize: "5em", whiteSpace: "pre" }}>
        {text.slice(0, characters)}
      </div>
    </AbsoluteFill>
  );
};

export default Typewriter;
