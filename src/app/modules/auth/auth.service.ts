import httpStatus from "http-status";
import config from "../../config";
import { TLoginUser } from "./auth.interface";
import { createToken, verifyToken } from "./auth.utils";
import AppError from "../../errors/AppError";
import { SuperAdmin } from "../superAdmin/superAdmin.model";
import { Merchant } from "../Merchant/Merchant.model";
import { DeliveryMan } from "../Delivery Man/deliveryMan.model";
import { Branch } from "../Branch/branch.model";

const loginUser = async (payload: TLoginUser) => {
  // checking if the user is exist
  let user;
  const superAdmin = await SuperAdmin.userExists(payload.emailORphone);
  const merchant = await Merchant.isMerchantExists(payload.emailORphone);
  const deliveryMan = await DeliveryMan.isDeliveryManExists(
    payload.emailORphone
  );
  const branch = await Branch.isBranchExists(payload.emailORphone);

  // Check is password valid or not
  if (superAdmin) {
    //checking if the password is correct
    if (
      await SuperAdmin.isPasswordMatched(
        payload?.password,
        superAdmin?.password
      )
    ) {
      user = superAdmin;
    } else {
      throw new AppError(httpStatus.FORBIDDEN, "Password do not matched");
    }
  } else if (merchant) {
    if (
      await Merchant.isPasswordMatched(payload?.password, merchant?.password)
    ) {
      user = merchant;
    } else {
      throw new AppError(httpStatus.FORBIDDEN, "Password do not matched");
    }
  } else if (deliveryMan) {
    if (
      await DeliveryMan.isPasswordMatched(
        payload?.password,
        deliveryMan?.password
      )
    ) {
      user = deliveryMan;
    } else {
      throw new AppError(httpStatus.FORBIDDEN, "Password do not matched");
    }
  } else if (branch) {
    if (
      await Branch.isPasswordMatched(
        payload?.password,
        branch?.password
      )
    ) {
      user = branch;
    } else {
      throw new AppError(httpStatus.FORBIDDEN, "Password do not matched");
    }
  } else {
    throw new AppError(httpStatus.NOT_FOUND, "This user is not found !");
  }

  if (user.status === "Pending") {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Please wait for admin approvel!"
    );
  } else if (user.status === "Disabled") {
    throw new AppError(httpStatus.BAD_REQUEST, "Your account is now disable!");
  }

  //create token and sent to the  client
  const jwtPayload = {
    email: user.email,
    phone: user.phone,
    role: user.role,
    name: user.name,
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

const currentUser = async (email: String) => {
  let user;
  if (!user) {
    user = await DeliveryMan.findOne({ email });
  }
  if (!user) {
    user = await SuperAdmin.findOne({ email });
  }
  if (!user) {
    user = await Merchant.findOne({ email });
  }
  if (!user) {
    user = await Branch.findOne({ email });
  }
  return user;
};

const getAllllUsers = async () => {
  const [superAdmins, merchants, deliveryMen,branches] = await Promise.all([
    SuperAdmin.find(),
    Merchant.find(),
    DeliveryMan.find(),
    Branch.find(),
  ]);

  const allUsers = [...superAdmins, ...merchants, ...deliveryMen,...branches];

  // Sort the all user
  allUsers.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  return allUsers;
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

  const { email} = decoded;

  // checking if the user is exist
  const user = await currentUser(email);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "This user is not found !");
  }
  // checking if the user is Disabled
  if (user?.status === "Disabled") {
    throw new AppError(httpStatus.FORBIDDEN, "This user is Disabled! !");
  }

  const jwtPayload = {
    email: user.email,
    phone: user.phone,
    role: user.role,
    name: user.name,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_secret as string,
    config.jwt_access_expair as string
  );

  return {
    accessToken: `Bearer ${accessToken}`,
  };
};

export const AuthServices = {
  loginUser,
  currentUser,
  getAllllUsers,
  refreshToken,
};
