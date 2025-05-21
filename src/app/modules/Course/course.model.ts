import mongoose, { Schema } from "mongoose";
import { TCourse } from "./course.interface";



const courseSchema = new Schema<TCourse>(
  {
    title: { type: String, required: true },
  description: { type: String, required: true },
  subject: { type: String },
  level: { type: String },
  teacherId: { type: String, required: true },
  lessons: [{ type:Schema.Types.ObjectId, ref: 'Lesson' }],
  views: { type:Number, default:0, required:true},
  enrollment: { type:Number, default:0, required:true},     
  like: { type:Number, default:0, required:true},     
  },
  {
    timestamps: true,
  }
);


//parcel model
export const Course = mongoose.model<TCourse>("Course", courseSchema);
