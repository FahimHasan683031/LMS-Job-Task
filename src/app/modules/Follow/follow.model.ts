import mongoose, { Schema } from "mongoose";
import { TFollow } from "./follow.interface";

const followSchema = new Schema<TFollow>(
  {
    studentId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    teacherId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

followSchema.index({ studentId: 1, teacherId: 1 }, { unique: true });

export const Follow = mongoose.model<TFollow>('Follow', followSchema);