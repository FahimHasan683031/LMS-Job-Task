import express from "express";
import { FeedbackControllers } from "./feedback.controller";
import auth from "../../middlewares/auth";



const router = express.Router();
// create Feedback
router.post(
  "/",
  auth("Student"),
  FeedbackControllers.createFeedback
);

// Get all Feedback
router.get(
  "/",
  FeedbackControllers.getAllFeedbacks
);

// Get single Feedback
router.get("/:id", FeedbackControllers.getSingleFeedback);

// Update Feedback
router.patch(
  "/:id",
  auth("Student"),
  FeedbackControllers.updateleFeedback
);


// Delete single Feedback
router.delete(
  "/:id",
  auth("Student"),
  FeedbackControllers.deleteSingleFeedback
);

export const FeedbackRoutes = router;
