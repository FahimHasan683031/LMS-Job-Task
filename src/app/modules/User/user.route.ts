import express from "express";
import { UserControllers } from "./user.controller";

const router = express.Router();

router.get("/", UserControllers.getAllUser);

router.get("/:id", UserControllers.getSingleUser);

router.patch("/:id", UserControllers.updateUser);

router.delete("/:id", UserControllers.deleteUser);

export const UserRoutes = router;
