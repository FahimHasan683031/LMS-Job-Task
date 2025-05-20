import express from "express";
import { LessonControllers } from "./lesson.controller";



const router = express.Router();
// create Lesson
router.post(
  "/",
  LessonControllers.createLesson
);

// Get all Lesson
router.get(
  "/",
  LessonControllers.getAllLessons
);

// Get single Lesson
router.get("/:id", LessonControllers.getSingleLesson);

// Update Lesson
router.patch(
  "/:id",
  LessonControllers.updateleLesson
);


// Delete single Lesson
router.delete(
  "/:id",
  LessonControllers.deleteSingleLesson
);

export const LessonRoutes = router;
