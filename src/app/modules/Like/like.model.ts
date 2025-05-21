import mongoose, { Schema } from "mongoose";
import { TLike } from "./like.interface";

const LikeSchema = new Schema<TLike>(
  {
    studentId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    courseId: { type: Schema.Types.ObjectId, ref: "Course", required: true },
  },
  { timestamps: true }
);

export const Like = mongoose.model("Like", LikeSchema);
