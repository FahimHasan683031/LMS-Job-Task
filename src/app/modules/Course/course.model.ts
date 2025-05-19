import mongoose, { Schema } from "mongoose";
import { TCourse } from "./course.interface";


const courseSchema = new Schema<TCourse>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    subject: { type: String },
    level: { type: String },
    teacherId: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);


//parcel model
export const Course = mongoose.model<TCourse>("Course", courseSchema);
