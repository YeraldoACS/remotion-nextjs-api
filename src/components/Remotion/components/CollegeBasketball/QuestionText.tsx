import Scale from "../Animations/Scale";

type Props = {
  text: string;
};
const QuestionText: React.FC<Props> = ({ text = "Question Text" }) => {
  return (
    <Scale>
      <p
        style={{
          fontWeight: "bold",
          color: "white",
          whiteSpace: "pre-wrap",
          wordWrap: "break-word",
          lineHeight: 1.2,
          fontSize: "4.5rem",
        }}>
        {text}
      </p>
    </Scale>
  );
};

export default QuestionText;
