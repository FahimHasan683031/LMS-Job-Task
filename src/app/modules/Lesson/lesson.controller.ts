import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { LessonServices } from "./lesson.service";

const createLesson = catchAsync(async (req, res) => {
  const result = await LessonServices.createLessonInToDB(
    req.body
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Lesson create successfully",
    data: result,
  });
});

const getAllLessons = catchAsync(async (req, res) => {
  const result = await LessonServices.getAllLessonFromDB(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All Lesson get succesfully",
    data: result,
  });
});

const getSingleLesson = catchAsync(async (req, res) => {
  const result = await LessonServices.getSingleLessonFromDB(
    req.params.id
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: " Lesson find succesfully",
    data: result,
  });
});

const updateleLesson = catchAsync(async (req, res) => {
  const result = await LessonServices.UpdateLesson(req.params.id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: " Lesson Update succesfully",
    data: result,
  });
});

const deleteSingleLesson = catchAsync(async (req, res) => {
  const result = await LessonServices.deleteSingleLesson(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: " Lesson Delete succesfully",
    data: result,
  });
});

export const LessonControllers = {
  createLesson,
  getAllLessons,
  getSingleLesson,
  updateleLesson,
  deleteSingleLesson,
};
