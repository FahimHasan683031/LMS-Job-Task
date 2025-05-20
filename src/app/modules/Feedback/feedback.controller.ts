import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { FeedbackServices } from "./feedback.service";

const createFeedback = catchAsync(async (req, res) => {
  const result = await FeedbackServices.createFeedbackInToDB(
    req.body
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Feedback create successfully",
    data: result,
  });
});

const getAllFeedbacks = catchAsync(async (req, res) => {
  const result = await FeedbackServices.getAllFeedbackFromDB(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All Feedback get succesfully",
    data: result,
  });
});

const getSingleFeedback = catchAsync(async (req, res) => {
  const result = await FeedbackServices.getSingleFeedbackFromDB(
    req.params.id
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: " Feedback find succesfully",
    data: result,
  });
});

const updateleFeedback = catchAsync(async (req, res) => {
  const result = await FeedbackServices.UpdateFeedback(req.params.id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: " Feedback Update succesfully",
    data: result,
  });
});

const deleteSingleFeedback = catchAsync(async (req, res) => {
  const result = await FeedbackServices.deleteSingleFeedback(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: " Feedback Delete succesfully",
    data: result,
  });
});

export const FeedbackControllers = {
  createFeedback,
  getAllFeedbacks,
  getSingleFeedback,
  updateleFeedback,
  deleteSingleFeedback,
};
