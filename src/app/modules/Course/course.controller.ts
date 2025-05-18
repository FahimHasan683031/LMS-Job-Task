import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { parcelServices } from "./course.service";
import { TUser } from "../auth/auth.interface";

const createParcel = catchAsync(async (req, res) => {
  const result = await parcelServices.createParcelintoDB(
    req.body,
    req.user as TUser
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Parcel create successfully",
    data: result,
  });
});

const getAllParcels = catchAsync(async (req, res) => {
  const result = await parcelServices.getAllParcelFromDB(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All Parcel get succesfully",
    data: result,
  });
});

const getSingleParcel = catchAsync(async (req, res) => {
  const result = await parcelServices.getSingleParcelFromDB(
    req.params.TrakingId
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: " Parcel find succesfully",
    data: result,
  });
});

const updateleParcel = catchAsync(async (req, res) => {
  const result = await parcelServices.UpdateParcel(req.params.id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: " Parcel Update succesfully",
    data: result,
  });
});

const updateleParcelStaus = catchAsync(async (req, res) => {
  const result = await parcelServices.UpdateParcelStatus(
    req.params.id,
    req.body,
    req.user as TUser
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: " Parcel Status Update succesfully",
    data: result,
  });
});

const deleteSingleParcel = catchAsync(async (req, res) => {
  const result = await parcelServices.deleteSingleParcel(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: " Parcel Delete succesfully",
    data: result,
  });
});

export const ParcelControllers = {
  createParcel,
  getAllParcels,
  getSingleParcel,
  updateleParcel,
  deleteSingleParcel,
  updateleParcelStaus,
};
