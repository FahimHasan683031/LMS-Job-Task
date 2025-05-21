import express from "express";
import { LessonControllers } from "./lesson.controller";
import auth from "../../middlewares/auth";



const router = express.Router();
// create Lesson
router.post(
  "/",
  auth("Teacher"),
  LessonControllers.createLesson
);

// Get all Lesson
router.get(
  "/",
  auth("Teacher","Student"),
  LessonControllers.getAllLessons
);

// Get single Lesson
router.get("/:id",
auth("Teacher","Student"),
 LessonControllers.getSingleLesson);

// Update Lesson
router.patch(
  "/:id",
  auth("Teacher"),
  LessonControllers.updateleLesson
);


// Delete single Lesson
router.delete(
  "/:id",
  auth("Teacher"),
  LessonControllers.deleteSingleLesson
);

export const LessonRoutes = router;
