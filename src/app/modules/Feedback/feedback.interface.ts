import { Types } from "mongoose";
export type TFeedback = {
  courseId: Types.ObjectId;
  studentId: Types.ObjectId;
  comment?: string;
  reating:number;
}