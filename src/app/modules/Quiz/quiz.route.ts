import express from "express";
import { QuizControllers } from "./quiz.controller";
import auth from "../../middlewares/auth";



const router = express.Router();
// create Quiz
router.post(
  "/",
  auth("Teacher"),
  QuizControllers.createQuiz
);

// Get all Quiz
router.get(
  "/",
  auth("Teacher","Student"),
  QuizControllers.getAllQuizs
);

// Get single Quiz
router.get("/:id",
auth("Teacher","Student"),
 QuizControllers.getSingleQuiz);

// Update Quiz
router.patch(
  "/:id",
  auth("Teacher"),
  QuizControllers.updateleQuiz
);


// Delete single Quiz
router.delete(
  "/:id",
  auth("Teacher"),
  QuizControllers.deleteSingleQuiz
);

export const QuizRoutes = router;
