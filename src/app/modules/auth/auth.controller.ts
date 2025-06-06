import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AuthServices } from "./auth.service";
import config from "../../config";

const signupUser = catchAsync(async (req, res) => {
  const result = await AuthServices.signupUser(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User signup succesfully",
    data: result,
  });
});

const loginUser = catchAsync(async (req, res) => {
  const { accessToken, user, rfreshToken } = await AuthServices.loginUser(
    req.body
  );
  const token = `Bearer ${accessToken}`;
  res.cookie("refreshToken", rfreshToken, {
    secure: config.NODE_ENV === "production",
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

const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;
  const result = await AuthServices.refreshToken(refreshToken);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Access token is retrieved succesfully!",
    data: result,
  });
});

export const AuthControllers = {
  loginUser,
  signupUser,
  refreshToken,
};
