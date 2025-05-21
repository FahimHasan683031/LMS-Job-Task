import mongoose from "mongoose";
import QueryBuilder from "../../builder/queryBuilder";
import AppError from "../../errors/AppError";
import { Course } from "../Course/course.model";
import { TEnrollment } from "./enrollment.interface";
import { Enrollment } from "./enrollment.model";
import httpStatus from "http-status";
import { Progress } from "../Progress/progress.model";
import { TProgress } from "../Progress/progress.interface";

const createEnrollmentInToDB = async (payload: TEnrollment) => {
  const enrollment = await Enrollment.findOne({
    studentId: payload.studentId,
    courseId: payload.courseId,
  });
  if (enrollment) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "You are already enroled this course"
    );
  }

  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    // create enrollment
    const result = await Enrollment.create([payload], { session });
    const enrollmentId = result[0]._id;

    // incriment course enrollment
    await Course.findOneAndUpdate(
      { _id: payload.courseId },
      { $inc: { enrollment: 1 } },
      { new: true, session }
    );

    // create progress
    const pBody: TProgress = {
      enrollmentId: enrollmentId,
      progressPercent: 0,
      complitedTopics: [],
      complitedQuizes: [],
    };
    const progress = await Progress.create([pBody], { session });
    const progressId = progress[0]._id;

    // update enrollement
    await Enrollment.findByIdAndUpdate(
      enrollmentId,
      { progress: progressId },
      { new: true, session }
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

const getAllEnrollmentFromDB = async (query: Record<string, unknown>) => {
  const EnrollmentQuery = new QueryBuilder(
    Enrollment.find()
      .populate("studentId")
      .populate("courseId")
      .populate("progress"),
    query
  )
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await EnrollmentQuery.modelQuery;
  return result;
};

const getSingleEnrollmentFromDB = async (_id: string) => {
  const result = await Enrollment.findById({ _id })
    .populate("studentId")
    .populate("courseId")
    .populate("progress");
  return result;
};

// Update Enrollment
const UpdateEnrollment = async (id: string, payload: Partial<TEnrollment>) => {
  const result = await Enrollment.findOneAndUpdate({ _id: id }, payload);
  return result;
};

// delete single Enrollment
const deleteSingleEnrollment = async (id: string) => {
  // create session
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    // Check if enrollment exists
    const enrollment = await Enrollment.findById(id).session(session);
    if (!enrollment) {
      throw new AppError(httpStatus.NOT_FOUND, "Enrollment not found");
    }

    // Delete this enrollment
    const result = await Enrollment.deleteOne({ _id: id }).session(session);

    // Delete this enrollment progress
    await Progress.deleteOne({ enrollmentId: id }).session(session);

    // Decriment course enrollment
    await Course.findOneAndUpdate(
      { _id: enrollment.courseId },
      { $inc: { enrollment: -1 } },
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

export const EnrollmentServices = {
  createEnrollmentInToDB,
  getAllEnrollmentFromDB,
  getSingleEnrollmentFromDB,
  UpdateEnrollment,
  deleteSingleEnrollment,
};
