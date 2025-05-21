import express from "express";
import { LikeControllers } from "./like.controller";



const router = express.Router();
// create Like
router.post(
  "/",
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
  LikeControllers.updateleLike
);


// Delete single Like
router.delete(
  "/:id",
  LikeControllers.deleteSingleLike
);

export const LikeRoutes = router;
