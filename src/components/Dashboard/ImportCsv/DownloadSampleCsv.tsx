"use client";

import { Button } from "react-bootstrap";
import { saveAs } from "file-saver";

export function DownloadSampleCsv() {
  const handleDownload = () => {
    const headers = ["id", "title", "description", "backgroundVideoUrl", "durationInSeconds", "question", "answers", "correctAnswer"];

    const sample = {
      id: "basketball-game",
      title: "College Basketball Mania",
      description: "College Basketball Mania",
      backgroundVideoUrl: "http://localhost:3000/videos/background_1_compressed.mp4",
      durationInSeconds: "3600",
      quizData: [
        {
          question: "Which team upset #1 Purdue in 2023?",
          answers: ["Oral Roberts", "Princenton", "Fairleigh Dickinson", "Saint Peter's"],
          correctAnswer: "Fairleigh Dickinson",
        },
        {
          question: "Who won the 2021 NCAA championship?",
          answers: ["Baylor", "Gonzaga", "UCLA", "Houston"],
          correctAnswer: "Baylor",
        },
      ],
    };

    const quiz = sample.quizData[0];

    const row = [
      sample.id,
      sample.title,
      sample.description,
      sample.backgroundVideoUrl,
      sample.durationInSeconds,
      quiz.question,
      quiz.answers.join(";"), // semicolon-delimited answers
      quiz.correctAnswer,
    ];

    const csvContent = [headers, row].map((e) => e.map((value) => `"${value.replace(/"/g, '""')}"`).join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "sample-quiz.csv");
  };

  return (
    <Button
      variant="outline-primary"
      onClick={handleDownload}>
      Download Sample CSV
    </Button>
  );
}
