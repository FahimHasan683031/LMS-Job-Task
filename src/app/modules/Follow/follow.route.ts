import express from "express";
import { FollowControllers } from "./follow.controller";
import auth from "../../middlewares/auth";



const router = express.Router();
// create Follow
router.post(
  "/",
  auth("Student"),
  FollowControllers.createFollow
);

// Get all Follow
router.get(
  "/",
  FollowControllers.getAllFollows
);

// Get single Follow
router.get("/:id", FollowControllers.getSingleFollow);

// Update Follow
router.patch(
  "/:id",
  auth("Student"),
  FollowControllers.updateleFollow
);


// Delete single Follow
router.delete(
  "/:id",
  auth("Student"),
  FollowControllers.deleteSingleFollow
);

export const FollowRoutes = router;
