import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AuthServices } from "./auth.service";
import config from "../../config";




const createUser = catchAsync(async (req, res) => {
  const result = await AuthServices.createUser(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User create succesfully',
    data: result,
  });
});


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


const getAllUser = catchAsync(async(req,res)=>{
  const result = await AuthServices.getAllUsers()
  sendResponse(res,{
    statusCode: httpStatus.OK,
    success:true,
    message:"All users get successfully!",
    data:result
  })
})

const getSingleUser = catchAsync(async(req,res)=>{
  const result = await AuthServices.getSingleUser(req.params.id)
  sendResponse(res,{
    statusCode: httpStatus.OK,
    success:true,
    message:"User find successfully!",
    data:result
  })
})


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
  createUser,
  refreshToken,
  getAllUser,
  getSingleUser
};
