import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AuthServices } from "./auth.service";
import config from "../../config";



const loginUser = catchAsync(async (req, res) => {
  const { accessToken, user, rfreshToken} = await AuthServices.loginUser(req.body);
  const token = `Bearer ${accessToken}`;
  res.cookie('refreshToken', rfreshToken, {
    secure: config.NODE_ENV === 'production',
    httpOnly: true,
  });
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User logged in successfully",
    data: {
      token: token,
      user,
    },
  });
});

const getCurrentUser = catchAsync(async (req, res) => {
  const result = await AuthServices.currentUser(req.query.email as string);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Current user find succesfully',
    data: result,
  });
});

const getAllUsers = catchAsync(async (req, res) => {
  const result = await AuthServices.getAllllUsers();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Users find succesfully',
    data: result,
  });
});

const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;
  const result = await AuthServices.refreshToken(refreshToken);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Access token is retrieved succesfully!',
    data: result,
  });
});

export const AuthControllers = {
  loginUser,
  getCurrentUser,
  getAllUsers,
  refreshToken
};
