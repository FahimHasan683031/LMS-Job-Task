import mongoose from "mongoose";
import QueryBuilder from "../../builder/queryBuilder";
import { Lesson } from "../Lesson/lesson.model";
import { TTopic } from "./topic.interface";
import { Topic } from "./topic.model";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import { Quiz } from "../Quiz/quiz.model";

const createTopicInToDB = async (payload: TTopic) => {
  // create session
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    //  create topic

    const result = await Topic.create([payload], { session });

    // udatate lession
    const { lessonId } = payload;
    const topicId = result[0]._id;
    const updatedLesson = await Lesson.findByIdAndUpdate(
      lessonId,
      { $addToSet: { topics: topicId } },
      { new: true, session }
    );

    // Check existing lession update or not
    if (!updatedLesson) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to update lession");
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

// get all topics
const getAllTopicFromDB = async (query: Record<string, unknown>) => {
  const TopicQuery = new QueryBuilder(Topic.find(), query)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await TopicQuery.modelQuery;
  return result;
};

// get single topic
const getSingleTopicFromDB = async (_id: string) => {
  const result = await Topic.findById({ _id });
  return result;
};

// Update Topic
const UpdateTopic = async (id: string, payload: Partial<TTopic>) => {
  const result = await Topic.findOneAndUpdate({ _id: id }, payload);
  return result;
};

// delete single Topic
const deleteSingleTopic = async (id: string) => {
  // create session
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    // find topic
    const topic = await Topic.findById(id).session(session);
    if (!topic) {
      throw new AppError(httpStatus.NOT_FOUND, "Topic not found");
    }
    // delete topic
    const result = await Topic.deleteOne({ _id: id }).session(session);

    // Delete all quiz with this topic
    await Quiz.deleteMany({ topicId: id }).session(session);

    // Remove topic id from the lesson's topics array
    await Lesson.findByIdAndUpdate(
      topic.lessonId,
      { $pull: { topics: id } },
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

export const TopicServices = {
  createTopicInToDB,
  getAllTopicFromDB,
  getSingleTopicFromDB,
  UpdateTopic,
  deleteSingleTopic,
};
