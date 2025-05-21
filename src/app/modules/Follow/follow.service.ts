import QueryBuilder from "../../builder/queryBuilder";
import { TFollow } from "./follow.interface";
import { Follow } from "./follow.model";
import httpStatus from "http-status";
import AppError from "../../errors/AppError";

// Create Follow
const createFollowInToDB = async (payload: TFollow) => {
  const follow = await Follow.findOne({
    studentId: payload.studentId,
    teacherId: payload.teacherId,
  });
  if (follow) {
    throw new AppError(httpStatus.BAD_REQUEST, "You are already Following");
  }
  const result = await Follow.create(payload);
  return result;
};

// get all Follows
const getAllFollowFromDB = async (query: Record<string, unknown>) => {
  const FollowQuery = new QueryBuilder(
    Follow.find().populate("studentId").populate("teacherId"),
    query
  )
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await FollowQuery.modelQuery;
  return result;
};

// get single Follow
const getSingleFollowFromDB = async (_id: string) => {
  const result = await Follow.findById({ _id })
    .populate("studentId")
    .populate("teacherId");
  return result;
};

// Update Follow
const UpdateFollow = async (id: string, payload: Partial<TFollow>) => {
  const result = await Follow.findOneAndUpdate({ _id: id }, payload);
  return result;
};

// delete single Follow
const deleteSingleFollow = async (id: string) => {
  const result = await Follow.deleteOne({ _id: id });
  return result;
};

export const FollowServices = {
  createFollowInToDB,
  getAllFollowFromDB,
  getSingleFollowFromDB,
  UpdateFollow,
  deleteSingleFollow,
};
