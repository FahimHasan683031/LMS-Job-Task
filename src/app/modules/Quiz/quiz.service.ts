import mongoose from "mongoose";
import AppError from "../../errors/AppError";
import { TQuiz } from "./quiz.interface";
import { Quiz } from "./quiz.model";
import httpStatus from "http-status";
import { Topic } from "../Topic/topic.model";

// create Quiz
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


// get single quize by topic id
 const getSingleQuizFromDB = async (id: string) => {
  try{
    const quiz = await Quiz.findOne({ _id:id });

    if (!quiz) {
      throw new AppError(httpStatus.NOT_FOUND, "Quiz not found");
      };
   

    // Hide correct answers from student
    const safeQuiz = {
      topicId: quiz.topicId,
      questions: quiz.questions.map(q => ({
        question: q.question,
        options: q.options,
      })),
    };

    return safeQuiz;
  }catch(err:any){
    throw new AppError(httpStatus.NOT_FOUND, err.message);
  }
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
  getSingleQuizFromDB,
  UpdateQuiz,
  deleteSingleQuiz,
};
