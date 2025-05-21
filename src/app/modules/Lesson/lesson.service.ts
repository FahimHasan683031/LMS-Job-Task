import mongoose from "mongoose";
import QueryBuilder from "../../builder/queryBuilder";
import { Course } from "../Course/course.model";
import { TLesson } from "./lesson.interface";
import { Lesson } from "./lesson.model";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import { Topic } from "../Topic/topic.model";

const createLessonInToDB = async (payload: TLesson) => {
  // create session
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    // create lesson
    const { courseId } = payload;
    const result = await Lesson.create([payload], { session });
    const lessonId = result[0]._id;

    // update course
    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      { $addToSet: { lessons: lessonId } },
      { new: true, session }
    );

    // Check existing course update or not
    if (!updatedCourse) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to update course");
    }

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

// get all lessons
const getAllLessonFromDB = async (query: Record<string, unknown>) => {
  const LessonQuery = new QueryBuilder(Lesson.find(), query)
    .search(["title"])
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await LessonQuery.modelQuery;
  return result;
};

// get single lesson
const getSingleLessonFromDB = async (_id: string) => {
  const result = await Lesson.findById({ _id });
  return result;
};

// Update Lesson
const UpdateLesson = async (id: string, payload: Partial<TLesson>) => {
  const result = await Lesson.findOneAndUpdate({ _id: id }, payload);
  return result;
};

// delete single Lesson
const deleteSingleLesson = async (id: string) => {
  // create session
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    // Find lesson
    const lesson = await Lesson.findById(id).session(session);
    if (!lesson) {
      throw new AppError(httpStatus.NOT_FOUND, "Lesson not found");
    }

    // delete lesson
    const result = await Lesson.deleteOne({ _id: id }).session(session);

    // Delete all topics with this lesson
    await Topic.deleteMany({ lessonId: id }).session(session);

    // remove lesson id from couse
    await Course.findByIdAndUpdate(
      lesson.courseId,
      { $pull: { lessons: id } },
      { session }
    );

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

export const LessonServices = {
  createLessonInToDB,
  getAllLessonFromDB,
  getSingleLessonFromDB,
  UpdateLesson,
  deleteSingleLesson,
};
