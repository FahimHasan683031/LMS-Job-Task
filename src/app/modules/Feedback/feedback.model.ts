import mongoose, { Schema } from "mongoose";
import { TFeedback } from "./feedback.interface";

const feedbackSchema = new Schema<TFeedback>(
  {
    courseId: { type: Schema.Types.ObjectId, ref: "Course", required: true },
    studentId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    comment: { type: String },
    reating: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Feedback = mongoose.model("Feedback", feedbackSchema);
