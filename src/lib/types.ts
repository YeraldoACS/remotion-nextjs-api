import { FieldValue, Timestamp, WhereFilterOp } from "firebase/firestore";

export interface QuizData {
  question: string;
  answers: string[];
  correctAnswer: string;
}

export interface VideoData {
  id: string;
  title: string;
  description: string;
  backgroundColor: string | "#000";
  compositionId: string;
  fps: number;
  duration: number;
  backgroundVideoUrl?: string;
  quizData: QuizData[];
  createdAt: string | FieldValue | Timestamp;
}

export interface UserData extends Omit<VideoData, "id"> {
  id: string;
  templateId: string;
}

export interface RenderedVideo {
  id: string;
  userDataId: string;
  templateId: string;
  renderUrl: string;
  renderThumbnail: string;
  status: "queued" | "rendering" | "completed" | "failed";
  renderTime: number;
  renderedAt: string;
  usedData: UserData;
  remotionMetadata: {
    compositionId: string;
    frameCount: number;
    outputFps: number;
    codec: string;
    res: string;
  };
}

export interface CSVTemplateData {
  id: string;
  title: string;
  backgroundVideoUrl: string;
  duration: number;
  description: string;
  question: string;
  correctAnswer: string;
  answers: string;
}

export interface FetchDocFromQuery {
  path: string;
  orderByVal: string;
  condition: {
    val: string;
    comparison: WhereFilterOp;
    field: string;
  };
  limitN: number;
}
