import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { LikeServices } from "./like.service";

const createLike = catchAsync(async (req, res) => {
  const result = await LikeServices.createLikeInToDB(
    req.body
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Like create successfully",
    data: result,
  });
});

const getAllLikes = catchAsync(async (req, res) => {
  const result = await LikeServices.getAllLikeFromDB(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All Like get succesfully",
    data: result,
  });
});

const getSingleLike = catchAsync(async (req, res) => {
  const result = await LikeServices.getSingleLikeFromDB(
    req.params.id
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: " Like find succesfully",
    data: result,
  });
});

const updateleLike = catchAsync(async (req, res) => {
  const result = await LikeServices.UpdateLike(req.params.id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: " Like Update succesfully",
    data: result,
  });
});

const deleteSingleLike = catchAsync(async (req, res) => {
  const result = await LikeServices.deleteSingleLike(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: " Like Delete succesfully",
    data: result,
  });
});

export const LikeControllers = {
  createLike,
  getAllLikes,
  getSingleLike,
  updateleLike,
  deleteSingleLike,
};
