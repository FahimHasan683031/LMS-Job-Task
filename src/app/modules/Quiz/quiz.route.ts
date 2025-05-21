import express from "express";
import { QuizControllers } from "./quiz.controller";



const router = express.Router();
// create Quiz
router.post(
  "/",
  QuizControllers.createQuiz
);

// Get all Quiz
router.get(
  "/",
  QuizControllers.getAllQuizs
);

// Get single Quiz
router.get("/:id", QuizControllers.getSingleQuiz);

// Update Quiz
router.patch(
  "/:id",
  QuizControllers.updateleQuiz
);


// Delete single Quiz
router.delete(
  "/:id",
  QuizControllers.deleteSingleQuiz
);

export const QuizRoutes = router;
