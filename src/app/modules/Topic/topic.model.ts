import mongoose, { Schema } from "mongoose";
import { TTopic } from "./topic.interface";


const topicSchema = new Schema<TTopic>(
  {
    courseId: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
    lessonId: { type: Schema.Types.ObjectId, ref: 'Lesson', required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    type: { type: String, enum: ['lecture', 'quiz'], required: true },
  },
  { timestamps: true }
);

export const Topic = mongoose.model<TTopic>('Topic', topicSchema);