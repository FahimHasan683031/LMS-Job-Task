import mongoose, { Schema } from "mongoose";
import { TEnrollment} from "./enrollment.interface";


const enrollmentSchema = new Schema<TEnrollment>(
  {
    studentId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    courseId: { type: Schema.Types.ObjectId, ref: 'Course', required: true }
  },
  { timestamps: true }
);

export const Enrollment = mongoose.model('Enrollment', enrollmentSchema);