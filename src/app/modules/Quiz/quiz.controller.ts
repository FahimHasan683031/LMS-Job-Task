import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { QuizServices } from "./quiz.service";

const createQuiz = catchAsync(async (req, res) => {
  const result = await QuizServices.createQuizInToDB(
    req.body
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Quiz create successfully",
    data: result,
  });
});

const getAllQuizs = catchAsync(async (req, res) => {
  const result = await QuizServices.getAllQuizFromDB(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All Quiz get succesfully",
    data: result,
  });
});

const getSingleQuiz = catchAsync(async (req, res) => {
  const result = await QuizServices.getSingleQuizFromDB(
    req.params.id
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: " Quiz find succesfully",
    data: result,
  });
});

const updateleQuiz = catchAsync(async (req, res) => {
  const result = await QuizServices.UpdateQuiz(req.params.id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: " Quiz Update succesfully",
    data: result,
  });
});

const deleteSingleQuiz = catchAsync(async (req, res) => {
  const result = await QuizServices.deleteSingleQuiz(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: " Quiz Delete succesfully",
    data: result,
  });
});

export const QuizControllers = {
  createQuiz,
  getAllQuizs,
  getSingleQuiz,
  updateleQuiz,
  deleteSingleQuiz,
};
