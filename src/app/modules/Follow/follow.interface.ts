import { Types } from "mongoose";

export type TFollow ={
  studentId: Types.ObjectId;
  teacherId: Types.ObjectId;
}