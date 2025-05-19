import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { AuthControllers } from "./auth.controller";
import { AuthValidation } from "./auth.validation";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "./auth.constait";


const router = express.Router();

router.post(
  "/login",
  validateRequest(AuthValidation.loginValidationSchema),
  AuthControllers.loginUser
);

router.post(
  "/signup",
  AuthControllers.createUser
);

router.get(
  "/user",
  AuthControllers.getAllUser
)

router.get(
  "/user/:id",
  AuthControllers.getSingleUser
)

router.post(
  '/refresh-token',
  AuthControllers.refreshToken,
);


export const AuthRoutes = router;
