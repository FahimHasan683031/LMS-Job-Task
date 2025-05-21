import express from "express";
import { TopicControllers } from "./topic.controller";
import auth from "../../middlewares/auth";



const router = express.Router();
// create Topic
router.post(
  "/",
  auth("Teacher"),
  TopicControllers.createTopic
);

// Get all Topic
router.get(
  "/",
  auth("Teacher","Student"),
  TopicControllers.getAllTopics
);

// Get single Topic
router.get("/:id",
auth("Student"),
 TopicControllers.getSingleTopic);

// Update Topic
router.patch(
  "/:id",
  auth("Teacher"),
  TopicControllers.updateleTopic
);


// Delete single Topic
router.delete(
  "/:id",
  auth("Teacher"),
  TopicControllers.deleteSingleTopic
);

export const TopicRoutes = router;
