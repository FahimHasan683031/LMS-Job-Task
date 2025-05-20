import mongoose from "mongoose";
import QueryBuilder from "../../builder/queryBuilder";
import { TCourse } from "./course.interface";
import { Course } from "./course.model";
import { Lesson } from "../Lesson/lesson.model";
import { Topic } from "../Topic/topic.model";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";

// Create course
const createCourseInToDB = async (payload: TCourse) => {
  const result = await Course.create(payload);
  return result;
};

// Get all coruses
const getAllCourseFromDB = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(Course.find(), query)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await courseQuery.modelQuery;
  return result;
};

// Get single cours wiht lessons and topics
const getSingleCourseFromDB = async (_id: string) => {
  // update views
  await Course.findByIdAndUpdate(
    _id,
    { $inc: { views: 1 } },
    { new: true } 
  );
  // find course
  const course = await Course.findById(_id)
    .populate({
      path: "lessons",
      populate: {
        path: "topics",
        model: "Topic",
      },
    })
    .exec();
  return course;
};

// Update Course
const UpdateCourse = async (id: string, payload: Partial<TCourse>) => {
  const result = await Course.findOneAndUpdate({ _id: id }, payload);
  return result;
};

// delete single course
const deleteSingleCourse = async (id: string) => {
  // create session
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    // Check if course exists
    const course = await Course.findById(id).session(session);
    if (!course) {
      throw new AppError(httpStatus.NOT_FOUND, "Course not found");
    }

    // Delete the course
    const result = await Course.deleteOne({ _id: id }).session(session);

    // Delete all lessons belonging to this course
    await Lesson.deleteMany({ courseId: id }).session(session);

    // Delete all topics belonging to this course
    await Topic.deleteMany({ courseId: id }).session(session);

    // Commit transaction
    await session.commitTransaction();
    return result;
  } catch (err: any) {
    await session.abortTransaction();
    throw new AppError(httpStatus.BAD_REQUEST, err.message || "Operation Faid");
  } finally {
    session.endSession();
  }
};

export const CourseServices = {
  createCourseInToDB,
  getAllCourseFromDB,
  getSingleCourseFromDB,
  UpdateCourse,
  deleteSingleCourse,
};
