import QueryBuilder from "../../builder/queryBuilder";
import { Topic } from "../Topic/topic.model";
import { TProgress, TUpdateProgress } from "./progress.interface";
import { Progress } from "./progress.model";

const getAllProgressFromDB = async (query: Record<string, unknown>) => {
  const ProgressQuery = new QueryBuilder(
    Progress.find().populate("topicId"),
    query
  )
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await ProgressQuery.modelQuery;
  return result;
};

const getSingleProgressFromDB = async (_id: string) => {
  const result = await Progress.findById({ _id }).populate("topicId");
  return result;
};

// Update Progress
const UpdateProgress = async (id: string, payload: TUpdateProgress) => {
  const updatedProgress = await Progress.findOneAndUpdate(
    { _id: id },
    { $addToSet: { complitedTopics: payload.topicId } },
    { new: true }
  );

  // calculate progress percentage
  const totalTopics = (await Topic.find({ courseId: payload.courseId })).length;
  const complitedTopics = updatedProgress?.complitedTopics?.length;
  const progressPercent = (totalTopics * (complitedTopics as number))/100;
  // update Progress percentage
  const result = await Progress.findOneAndUpdate(
    { _id: id },
    { progressPercent: progressPercent},
    { new: true }
  );

  return result;

};

// delete single Progress
const deleteSingleProgress = async (id: string) => {
  // Delete the Progress
  const result = await Progress.deleteOne({ _id: id });
  return result;
};

export const ProgressServices = {
  getAllProgressFromDB,
  getSingleProgressFromDB,
  UpdateProgress,
  deleteSingleProgress,
};
