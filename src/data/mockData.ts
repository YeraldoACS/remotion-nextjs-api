export interface QuizData {
  question: string;
  answers: string[];
}

export interface VideoData {
  id: string;
  title: string;
  description: string;
  backgroundColor: string | "#ffffff";
  // textColor?: string;
  duration: number;
  backgroundVideoUrl?: string;
  quizData: QuizData[];
}

export const mockVideos: VideoData[] = [
  {
    id: "basketball-game",
    title: "College Basketball Mania",
    description: "College Basketball Mania",
    duration: 600,
    backgroundColor: "#ffffff",
    backgroundVideoUrl: "https://barvanna.com/mrss/content/COLLEGE%20HOOPS%20A%20WITH%20SOUND%20EFFECTS.mp4",
    quizData: [
      {
        question: "It was only the second time in history: Which 16 seed upset #1 seed purdue in the 2023 NCAA tournament",
        answers: ["Oral Roberts", "Princenton", "Fairleigh Dickinson", "Saint Peter's"],
      },
      {
        question: "What is the population of Canada?",
        answers: ["10M", "20M", "38M", "50M"],
      },
      {
        question: "What is the tallest mountain?",
        answers: ["Mount Everest", "K2", "Kilimanjaro", "Denali"],
      },
    ],
  },
  // {
  //   id: "1",
  //   title: "Welcome to Our Platform",
  //   description: "An introduction to our amazing services",
  //   backgroundColor: "#3498db",
  //   textColor: "#ffffff",
  //   duration: 300,
  // },
  // {
  //   id: "2",
  //   title: "Product Showcase",
  //   description: "Highlighting our best features",
  //   backgroundColor: "#2ecc71",
  //   textColor: "#ffffff",
  //   duration: 450,
  // },
  // {
  //   id: "3",
  //   title: "Customer Testimonials",
  //   description: "What our clients are saying about us",
  //   backgroundColor: "#e74c3c",
  //   textColor: "#ffffff",
  //   duration: 600,
  // },
  // {
  //   id: "4",
  //   title: "Year in Review",
  //   description: "Our accomplishments this year",
  //   backgroundColor: "#9b59b6",
  //   textColor: "#ffffff",
  //   duration: 750,
  // },
  // {
  //   id: "5",
  //   title: "How-To Tutorial",
  //   description: "Step by step guide for beginners",
  //   backgroundColor: "#f39c12",
  //   textColor: "#ffffff",
  //   duration: 900,
  // },
];
