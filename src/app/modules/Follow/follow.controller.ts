import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { FollowServices } from "./follow.service";

const createFollow = catchAsync(async (req, res) => {
  const result = await FollowServices.createFollowInToDB(
    req.body
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Follow create successfully",
    data: result,
  });
});

const getAllFollows = catchAsync(async (req, res) => {
  const result = await FollowServices.getAllFollowFromDB(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All Follow get succesfully",
    data: result,
  });
});

const getSingleFollow = catchAsync(async (req, res) => {
  const result = await FollowServices.getSingleFollowFromDB(
    req.params.id
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: " Follow find succesfully",
    data: result,
  });
});

const updateleFollow = catchAsync(async (req, res) => {
  const result = await FollowServices.UpdateFollow(req.params.id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: " Follow Update succesfully",
    data: result,
  });
});

const deleteSingleFollow = catchAsync(async (req, res) => {
  const result = await FollowServices.deleteSingleFollow(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: " Follow Delete succesfully",
    data: result,
  });
});

export const FollowControllers = {
  createFollow,
  getAllFollows,
  getSingleFollow,
  updateleFollow,
  deleteSingleFollow,
};
