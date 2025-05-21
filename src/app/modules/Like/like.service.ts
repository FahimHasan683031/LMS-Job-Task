import mongoose from "mongoose";
import QueryBuilder from "../../builder/queryBuilder";
import AppError from "../../errors/AppError";
import { Course } from "../Course/course.model";
import { TLike } from "./like.interface";
import { Like } from "./like.model";
import httpStatus from "http-status";

const createLikeInToDB = async (payload: TLike) => {
  const like = await Like.findOne({
    studentId: payload.studentId,
    courseId: payload.courseId,
  });
  if (like) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "You are already liked this course"
    );
  }

  const result = await Like.create(payload);
  // incriment course Like
  await Course.findOneAndUpdate(
    { _id: payload.courseId },
    { $inc: { like: 1 } },
    { new: true }
  );
  return result;
};

const getAllLikeFromDB = async (query: Record<string, unknown>) => {
  const LikeQuery = new QueryBuilder(
    Like.find().populate("studentId").populate("courseId"),
    query
  )
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await LikeQuery.modelQuery;
  return result;
};

const getSingleLikeFromDB = async (_id: string) => {
  const result = await Like.findById({ _id })
    .populate("studentId")
    .populate("courseId");
  return result;
};

// Update Like
const UpdateLike = async (id: string, payload: Partial<TLike>) => {
  const result = await Like.findOneAndUpdate({ _id: id }, payload);
  return result;
};

// delete single Like
const deleteSingleLike = async (id: string) => {
  // create session
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    // Check if Like exists
    const like = await Like.findById(id).session(session);
    if (!like) {
      throw new AppError(httpStatus.NOT_FOUND, "Like not found");
    }

    // Delete the Like
    const result = await Like.deleteOne({ _id: id }).session(session);

    // incriment course Like
    await Course.findOneAndUpdate(
      { _id: like.courseId },
      { $inc: { like: -1 } },
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

export const LikeServices = {
  createLikeInToDB,
  getAllLikeFromDB,
  getSingleLikeFromDB,
  UpdateLike,
  deleteSingleLike,
};
