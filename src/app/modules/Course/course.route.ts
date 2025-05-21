import express from "express";
import { CourseControllers } from "./course.controller";
import auth from "../../middlewares/auth";



const router = express.Router();
// create Course
router.post(
  "/",
  auth("Teacher"),
  CourseControllers.createCourse
);

// Get all Course
router.get(
  "/",
  CourseControllers.getAllCourses
);

// Get single Course
router.get("/:id",
auth("Teacher","Student"),
 CourseControllers.getSingleCourse);

// Update Course
router.patch(
  "/:id",
  auth("Teacher"),
  CourseControllers.updateleCourse
);


// Delete single Course
router.delete(
  "/:id",
  auth("Teacher"),
  CourseControllers.deleteSingleCourse
);

export const CourseRoutes = router;
