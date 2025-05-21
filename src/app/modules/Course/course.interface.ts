import { Types } from "mongoose";


export type TCourse = {
  title: string;
  description: string;
  subject?: string;
  level?: string;
  teacherId: string;
  lessons?:Types.ObjectId[],
  views:number,
  enrollment:number,
  like:number
};
