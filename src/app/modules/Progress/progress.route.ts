import express from "express";
import { ProgressControllers } from "./progress.controller";



const router = express.Router();

// Get all Progress
router.get(
  "/",
  ProgressControllers.getAllProgresss
);

// Get single Progress
router.get("/:id", ProgressControllers.getSingleProgress);

// Update Progress
router.patch(
  "/:id",
  ProgressControllers.updateleProgress
);


// Delete single Progress
router.delete(
  "/:id",
  ProgressControllers.deleteSingleProgress
);

export const ProgressRoutes = router;
