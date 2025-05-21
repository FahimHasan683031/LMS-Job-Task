import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { ProgressServices } from "./progress.service";



const getAllProgresss = catchAsync(async (req, res) => {
  const result = await ProgressServices.getAllProgressFromDB(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All Progress get succesfully",
    data: result,
  });
});

const getSingleProgress = catchAsync(async (req, res) => {
  const result = await ProgressServices.getSingleProgressFromDB(
    req.params.id
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: " Progress find succesfully",
    data: result,
  });
});

const updateleProgress = catchAsync(async (req, res) => {
  const result = await ProgressServices.UpdateProgress(req.params.id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: " Progress Update succesfully",
    data: result,
  });
});

const deleteSingleProgress = catchAsync(async (req, res) => {
  const result = await ProgressServices.deleteSingleProgress(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: " Progress Delete succesfully",
    data: result,
  });
});

export const ProgressControllers = {
  getAllProgresss,
  getSingleProgress,
  updateleProgress,
  deleteSingleProgress,
};
