import { QuizData } from "@app/src/lib/types";
import { Accordion, ListGroup } from "react-bootstrap";

interface Props {
  quizData: QuizData[];
}

export default function QuizDataPreview({ quizData }: Props) {
  return (
    <section className="bg-white shadow-sm">
      <div className="px-4 py-4">
        <Accordion
          alwaysOpen>
          {quizData.map((quiz, index) => (
            <Accordion.Item
              key={`quizData-${index.toString()}`}
              as={"article"}
              eventKey={index.toString()}>
              <Accordion.Header className="bg-white fw-bold">{quiz.question}</Accordion.Header>
              <Accordion.Body>
                <p>
                  <span className="fw-bold">Correct answer:</span> {quiz.correctAnswer}
                </p>
                <ListGroup>
                  {quiz.answers.map((answer, index) => (
                    <ListGroup.Item key={`quizData-answer-${index.toString()}`}>{answer}</ListGroup.Item>
                  ))}
                </ListGroup>
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
