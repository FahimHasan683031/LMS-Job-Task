import mongoose, { Schema } from "mongoose";
import {  TQuiz, TQuizResult } from "./quiz.interface";

// Quize Schema
const quizSchema = new Schema<TQuiz>(
  {
    topicId: { type: Schema.Types.ObjectId, ref: 'Topic', required: true },
    questions: [
      {
        question: { type: String, required: true },
        options: [{ type: String, required: true }],
        correctAnswer: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

export const Quiz = mongoose.model<TQuiz>('Quiz', quizSchema);

// Quize Result
const quizResultSchema = new Schema<TQuizResult>(
  {
    studentId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    topicId: { type: Schema.Types.ObjectId, ref: 'Topic', required: true },
    score: { type: Number, required: true },
  },
  { timestamps: true }
);

quizResultSchema.index({ studentId: 1, topicId: 1 }, { unique: true });

export const QuizResult = mongoose.model<TQuizResult>('QuizResult', quizResultSchema);