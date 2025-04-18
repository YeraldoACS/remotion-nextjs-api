import { VideoData } from "../lib/types";

export const mockVideos: VideoData[] = [
  {
    id: "basketball-game",
    title: "College Basketball Mania",
    description: "College Basketball Mania",
    compositionId: "basketball-template",
    duration: 10 * 30, // Totals 2 minutes
    fps: 30,
    createdAt: "N/A",
    backgroundColor: "#000",
    backgroundVideoUrl: "http://localhost:3000/videos/background_1_compressed.mp4",
    quizData: [
      {
        question: "It was only the second time in history: Which 16 seed upset #1 seed purdue in the 2023 NCAA tournament",
        answers: ["Oral Roberts", "Princenton", "Fairleigh Dickinson", "Saint Peter's"],
        correctAnswer: "Princenton",
      },
      {
        question: "What is the population of Canada?",
        answers: ["10M", "20M", "38M", "50M"],
        correctAnswer: "20M",
      },
      {
        question: "What is the tallest mountain?",
        answers: ["Mount Everest", "K2", "Kilimanjaro", "Denali"],
        correctAnswer: "Mount Everest",
      },
      {
        question: "What is the tallest mountain?",
        answers: ["Mount Everest", "K2", "Kilimanjaro", "Denali"],
        correctAnswer: "Kilimanjaro",
      },
      {
        question: "What is the capital of USA?",
        answers: ["New York", "Washington, D.C.", "Los Angeles", "Chicago"],
        correctAnswer: "Washington, D.C.",
      },
    ],
  },
];
