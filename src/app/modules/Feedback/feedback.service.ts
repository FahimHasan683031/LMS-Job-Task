import QueryBuilder from "../../builder/queryBuilder";
import { TFeedback } from "./feedback.interface";
import { Feedback } from "./feedback.model";

// create Feedback
const createFeedbackInToDB = async (payload: TFeedback) => {
 const result = await Feedback.create(payload);
 return result;
};

// get all Feedbacks
const getAllFeedbackFromDB = async (query: Record<string, unknown>) => {
  const FeedbackQuery = new QueryBuilder(Feedback.find(), query)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await FeedbackQuery.modelQuery;
  return result;
};

// get single Feedback
const getSingleFeedbackFromDB = async (_id: string) => {
  const result = await Feedback.findById({ _id });
  return result;
};

// Update Feedback
const UpdateFeedback = async (id: string, payload: Partial<TFeedback>) => {
  const result = await Feedback.findOneAndUpdate({ _id: id }, payload);
  return result;
};

// delete single Feedback
const deleteSingleFeedback = async (id: string) => {
  const result = await Feedback.deleteOne({ _id: id });
  return result;
};

export const FeedbackServices = {
  createFeedbackInToDB,
  getAllFeedbackFromDB,
  getSingleFeedbackFromDB,
  UpdateFeedback,
  deleteSingleFeedback,
};
