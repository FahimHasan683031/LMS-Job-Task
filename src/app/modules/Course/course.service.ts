import QueryBuilder from "../../builder/queryBuilder";
import { TUser } from "../auth/auth.interface";
import { TCourse } from "./course.interface";
import { Course } from "./course.model";

const createCourseInToDB = async (payload: TCourse) => {
  const result = await Course.create(payload);
  return result;
};

const getAllCourseFromDB = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(Course.find(), query)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await courseQuery.modelQuery;
  return result;
};

const getSingleCourseFromDB = async (_id: string) => {
  const result = await Course.findById({ _id});
  return result;
};

// Update Course
const UpdateCourse = async (id: string, payload: Partial<TCourse>) => {
  const result = await Course.findOneAndUpdate({ _id: id }, payload);
  return result;
};


// delete single Course
const deleteSingleCourse = async (id: string) => {
  const result = await Course.deleteOne({ _id: id });
  return result;
};

export const CourseServices = {
  createCourseInToDB,
  getAllCourseFromDB,
  getSingleCourseFromDB,
  UpdateCourse,
  deleteSingleCourse,
};
