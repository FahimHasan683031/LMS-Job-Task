import express from "express";
import { EnrollmentControllers } from "./enrollment.controller";
import auth from "../../middlewares/auth";



const router = express.Router();
// create Enrollment
router.post(
  "/",
  auth("Student"),
  EnrollmentControllers.createEnrollment
);

// Get all Enrollment
router.get(
  "/",
  EnrollmentControllers.getAllEnrollments
);

// Get single Enrollment
router.get("/:id", EnrollmentControllers.getSingleEnrollment);

// Update Enrollment
router.patch(
  "/:id",
  EnrollmentControllers.updateleEnrollment
);


// Delete single Enrollment
router.delete(
  "/:id",
  EnrollmentControllers.deleteSingleEnrollment
);

export const EnrollmentRoutes = router;
