// remotion/MyVideo.tsx
import { Composition } from "remotion";
import { MyVideoComponent } from "../components/Remotion/MyVideoComponent";
import { VideoData } from "../data/mockData";

// Provide default props
const defaultVideoData: VideoData = {
  id: "1",
  title: "Sample Title",
  description: "This is a sample video.",
  // backgroundColor: "#ffffff",
  // textColor: "#000000",
  duration: 150,
  backgroundColor: "#ffffff",
  backgroundVideoUrl: "https://barvanna.com/mrss/content/COLLEGE%20HOOPS%20A%20WITH%20SOUND%20EFFECTS.mp4",
  quizData: [
    {
      question: "What is the capital of USA?",
      answers: ["New York", "Washington, D.C.", "Los Angeles", "Chicago"],
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
};

export const MyVideo = () => {
  return (
    <>
      <Composition
        id="my-video"
        // 🔥 Tell TypeScript "trust me, it's compatible"
        component={MyVideoComponent as unknown as React.FC<Record<string, unknown>>}
        durationInFrames={defaultVideoData.duration}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          videoData: defaultVideoData,
        }}
      />
    </>
  );
};
