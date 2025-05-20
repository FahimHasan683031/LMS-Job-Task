import express from "express";
import { CourseControllers } from "./course.controller";



const router = express.Router();
// create Course
router.post(
  "/",
  CourseControllers.createCourse
);

// Get all Course
router.get(
  "/",
  CourseControllers.getAllCourses
);

// Get single Course
router.get("/:id", CourseControllers.getSingleCourse);

// Update Course
router.patch(
  "/:id",
  CourseControllers.updateleCourse
);


// Delete single Course
router.delete(
  "/:id",
  CourseControllers.deleteSingleCourse
);

export const CourseRoutes = router;
