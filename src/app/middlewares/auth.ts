import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import AppError from "../errors/AppError";
import catchAsync from "../utils/catchAsync";
import { AuthServices } from "../modules/auth/auth.service";
import { TUserRole } from "../modules/auth/auth.interface";

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")?.[1];

    // checking if the token is missing
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized!");
    }

    let decoded;
    try {
      // checking if the given token is valid
      decoded = jwt.verify(token, config.jwt_secret as string) as JwtPayload;
    } catch (err) {
      throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized!");
    }

    const { role, email, name, phone } = decoded;

    // checking if the user is exist
    const user = await AuthServices.currentUser(email);

    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, "This user is not found !");
    }

    // checking if the user is panding
    if (user?.status === "Pending") {
      throw new AppError(httpStatus.FORBIDDEN, "This user is Panding ! !");
    }

    // checking if the user is Disabled
    if (user?.status === "Disabled") {
      throw new AppError(httpStatus.FORBIDDEN, "This user is Disabled! !");
    }

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized!");
    }

    req.user = {
      email,
      name,
      phone,
      role,
    };
    next();
  });
};

export default auth;
