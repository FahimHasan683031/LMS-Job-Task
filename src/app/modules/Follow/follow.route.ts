import express from "express";
import { FollowControllers } from "./follow.controller";



const router = express.Router();
// create Follow
router.post(
  "/",
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
  FollowControllers.updateleFollow
);


// Delete single Follow
router.delete(
  "/:id",
  FollowControllers.deleteSingleFollow
);

export const FollowRoutes = router;
