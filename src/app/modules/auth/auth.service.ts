import httpStatus from "http-status";
import config from "../../config";
import { createToken, verifyToken } from "./auth.utils";
import AppError from "../../errors/AppError";
import bcrypt from "bcrypt";
import { TUser } from "../User/user.interface";
import { User } from "../User/user.model";
import { TLogin } from "./auth.interface";

// Create a new user
const signupUser = async (payload: TUser) => {
  // Check the user is already exist or not
  const user = await User.findOne({ email: payload.email });
  if (user) {
    throw new AppError(httpStatus.BAD_REQUEST, "This User is Already Exist!");
  }
  const newUser = await User.create(payload);
  return newUser;
};

// login user
const loginUser = async (payload: TLogin) => {
  // checking if the user is exist
  const user = await User.findOne({ email: payload.email });
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "This user is not found !");
  }

  //checking if the password is correct
  const isPasswordMatched = await bcrypt.compare(
    payload?.password,
    user?.password
  );
  if (!isPasswordMatched) {
    throw new AppError(httpStatus.FORBIDDEN, "Password don't matched!");
  }

  // checking user status
  if (user.status === "Disabled") {
    throw new AppError(
      httpStatus.FORBIDDEN,
      "Your account is currently disable!"
    );
  }

  //create token and send to the  client
  const jwtPayload = {
    email: user?.email,
    role: user?.role,
    name: user?.name,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_secret as string,
    config.jwt_access_expair as string
  );

  const rfreshToken = createToken(
    jwtPayload,
    config.jwt_secret as string,
    config.jwt_refresh_expair as string
  );

  return {
    accessToken,
    rfreshToken,
    user,
  };
};


const refreshToken = async (token: string) => {
  // checking if the token is missing
  if (!token) {
    throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized!");
  }

  let decoded;
  try {
    // checking if the given token is valid
    decoded = verifyToken(token, config.jwt_secret as string);
  } catch (err) {
    throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized!");
  }

  const { email } = decoded;

  // checking if the user is exist
  const user = await User.findOne({ email: email });

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "This user is not found !");
  }
  // checking if the user is Disabled
  if (user?.status === "Disabled") {
    throw new AppError(httpStatus.FORBIDDEN, "This user is Disabled! !");
  }

  const jwtPayload = {
    email: user.email,
    role: user.role,
    name: user.name,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_secret as string,
    config.jwt_access_expair as string
  );

  return { accessToken: `Bearer ${accessToken}` };
};

export const AuthServices = {
  signupUser,
  loginUser,
  refreshToken,
};
