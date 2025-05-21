import mongoose from "mongoose";
import QueryBuilder from "../../builder/queryBuilder";
import AppError from "../../errors/AppError";
import { Course } from "../Course/course.model";
import { TQuiz } from "./quiz.interface";
import { Quiz } from "./quiz.model";
import httpStatus from "http-status";
import { Topic } from "../Topic/topic.model";

const createQuizInToDB = async (payload: TQuiz) => {
  // create session
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    //  create quiz
    const result = await Quiz.create([payload], { session });

    // udatate topic
    const { topicId } = payload;
    const quizeId = result[0]._id;
    const updatedTopic = await Topic.findByIdAndUpdate(
      topicId,
      { quiz: quizeId  },
      { new: true, session }
    );

    // Check existing topic update or not
    if (!updatedTopic) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to update topic");
    }

    // Commit transaction
    await session.commitTransaction();
    return result;

  } catch (err:any) {
    await session.abortTransaction();
    throw new AppError(httpStatus.BAD_REQUEST, err.message ||"Operation Faid");
  } finally {
    session.endSession();
  }
};

const getAllQuizFromDB = async (query: Record<string, unknown>) => {
  const QuizQuery = new QueryBuilder(
    Quiz.find().populate("topicId"),
    query
  )
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await QuizQuery.modelQuery;
  return result;
};

const getSingleQuizFromDB = async (_id: string) => {
  const result = await Quiz.findById({ _id })
    .populate("topicId");
  return result;
};

// Update Quiz
const UpdateQuiz = async (id: string, payload: Partial<TQuiz>) => {
  const result = await Quiz.findOneAndUpdate({ _id: id }, payload);
  return result;
};

// delete single Quiz
const deleteSingleQuiz = async (id: string) => {
  // create session
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    // Check if Quiz exists
    const quiz = await Quiz.findById(id).session(session);
    if (!quiz) {
      throw new AppError(httpStatus.NOT_FOUND, "Quiz not found");
    }

    // Delete the Quiz
    const result = await Quiz.deleteOne({ _id: id }).session(session);

    // remove quiz id from topic
    await Topic.findOneAndUpdate(
      { _id: quiz.topicId },
      { quiz:null },
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

export const QuizServices = {
  createQuizInToDB,
  getAllQuizFromDB,
  getSingleQuizFromDB,
  UpdateQuiz,
  deleteSingleQuiz,
};
