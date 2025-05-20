import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { EnrollmentServices } from "./enrollment.service";

const createEnrollment = catchAsync(async (req, res) => {
  const result = await EnrollmentServices.createEnrollmentInToDB(
    req.body
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Enrollment create successfully",
    data: result,
  });
});

const getAllEnrollments = catchAsync(async (req, res) => {
  const result = await EnrollmentServices.getAllEnrollmentFromDB(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All Enrollment get succesfully",
    data: result,
  });
});

const getSingleEnrollment = catchAsync(async (req, res) => {
  const result = await EnrollmentServices.getSingleEnrollmentFromDB(
    req.params.id
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: " Enrollment find succesfully",
    data: result,
  });
});

const updateleEnrollment = catchAsync(async (req, res) => {
  const result = await EnrollmentServices.UpdateEnrollment(req.params.id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: " Enrollment Update succesfully",
    data: result,
  });
});

const deleteSingleEnrollment = catchAsync(async (req, res) => {
  const result = await EnrollmentServices.deleteSingleEnrollment(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: " Enrollment Delete succesfully",
    data: result,
  });
});

export const EnrollmentControllers = {
  createEnrollment,
  getAllEnrollments,
  getSingleEnrollment,
  updateleEnrollment,
  deleteSingleEnrollment,
};
