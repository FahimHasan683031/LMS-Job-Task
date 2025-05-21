import { Types } from "mongoose";


export type TProgress ={
  enrollmentId: Types.ObjectId;
  progressPercent:Number;
  complitedTopics: Types.ObjectId[];
}

export type TUpdateProgress ={
  topicId: string;
  courseId: string;
}