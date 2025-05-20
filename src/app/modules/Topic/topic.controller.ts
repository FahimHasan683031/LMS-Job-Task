import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { TopicServices } from "./topic.service";

const createTopic = catchAsync(async (req, res) => {
  const result = await TopicServices.createTopicInToDB(
    req.body
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Topic create successfully",
    data: result,
  });
});

const getAllTopics = catchAsync(async (req, res) => {
  const result = await TopicServices.getAllTopicFromDB(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All Topic get succesfully",
    data: result,
  });
});

const getSingleTopic = catchAsync(async (req, res) => {
  const result = await TopicServices.getSingleTopicFromDB(
    req.params.id
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: " Topic find succesfully",
    data: result,
  });
});

const updateleTopic = catchAsync(async (req, res) => {
  const result = await TopicServices.UpdateTopic(req.params.id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: " Topic Update succesfully",
    data: result,
  });
});

const deleteSingleTopic = catchAsync(async (req, res) => {
  const result = await TopicServices.deleteSingleTopic(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: " Topic Delete succesfully",
    data: result,
  });
});

export const TopicControllers = {
  createTopic,
  getAllTopics,
  getSingleTopic,
  updateleTopic,
  deleteSingleTopic,
};
