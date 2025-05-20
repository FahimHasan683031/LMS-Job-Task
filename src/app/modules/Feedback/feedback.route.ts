import express from "express";
import { FeedbackControllers } from "./feedback.controller";



const router = express.Router();
// create Feedback
router.post(
  "/",
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
  FeedbackControllers.updateleFeedback
);


// Delete single Feedback
router.delete(
  "/:id",
  FeedbackControllers.deleteSingleFeedback
);

export const FeedbackRoutes = router;
