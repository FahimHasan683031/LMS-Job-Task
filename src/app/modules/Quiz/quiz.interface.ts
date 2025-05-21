import { Types } from "mongoose";

export type TQuestion ={
  question: string;
  options: string[];
  correctAnswer: string;
}

export type TQuiz ={
  topicId: Types.ObjectId;
  questions: TQuestion[];
}

export type TQuizResult ={
  studentId: Types.ObjectId;
  topicId: Types.ObjectId;
  score: number;
}