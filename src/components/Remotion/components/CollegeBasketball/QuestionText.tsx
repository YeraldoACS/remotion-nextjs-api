type Props = {
    realFrames?: number;
    text: string;
  };
  
  const QuestionText: React.FC<Props> = ({
    realFrames = 0,
    text = "Typewriter Effect",
  }) => {
    const characters = Math.min(realFrames / 3, text.length);
  
    return (
      <p
        style={{
          fontFamily: "SF Pro Text, Helvetica, Arial",
          fontWeight: "bold",
          fontSize: 70,
          textAlign: "center",
        }}
        className=" text-slate-700"
      >
        <span style={{ fontSize: "1em", whiteSpace: "pre" }}>
          {text.slice(0, characters)}
        </span>
      </p>
    );
  };
  
  export default QuestionText;
  