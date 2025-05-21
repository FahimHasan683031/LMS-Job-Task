import mongoose, { Schema } from "mongoose";
import { TProgress } from "./progress.interface";

// Progresse Schema
const ProgressSchema = new Schema<TProgress>(
  {
    enrollmentId: { type: Schema.Types.ObjectId, ref: "Enrollment", required: true },
    progressPercent:{ type:Number, default:0},
    complitedTopics: [{ type:Schema.Types.ObjectId, ref: 'Topic' }],
  },
  { timestamps: true }
);

export const Progress = mongoose.model<TProgress>("Progress", ProgressSchema);

