import express from "express";
import { LikeControllers } from "./like.controller";
import auth from "../../middlewares/auth";



const router = express.Router();
// create Like
router.post(
  "/",
  auth("Student"),
  LikeControllers.createLike
);

// Get all Like
router.get(
  "/",
  LikeControllers.getAllLikes
);

// Get single Like
router.get("/:id", LikeControllers.getSingleLike);

// Update Like
router.patch(
  "/:id",
  auth("Student"),
  LikeControllers.updateleLike
);


// Delete single Like
router.delete(
  "/:id",
  auth("Student"),
  LikeControllers.deleteSingleLike
);

export const LikeRoutes = router;
