import express from "express";
import { TopicControllers } from "./topic.controller";



const router = express.Router();
// create Topic
router.post(
  "/",
  TopicControllers.createTopic
);

// Get all Topic
router.get(
  "/",
  TopicControllers.getAllTopics
);

// Get single Topic
router.get("/:id", TopicControllers.getSingleTopic);

// Update Topic
router.patch(
  "/:id",
  TopicControllers.updateleTopic
);


// Delete single Topic
router.delete(
  "/:id",
  TopicControllers.deleteSingleTopic
);

export const TopicRoutes = router;
