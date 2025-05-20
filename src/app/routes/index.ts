import { Router } from "express";
import {  UserRoutes } from "../modules/User/user.route";
import { CourseRoutes } from "../modules/Course/course.route";
import { LessonRoutes } from "../modules/Lesson/lesson.route";
import { TopicRoutes } from "../modules/Topic/topic.route";
import { EnrollmentRoutes } from "../modules/Enrollment/enrollment.route";
import { AuthRoutes } from "../modules/Auth/auth.route";
import { FeedbackRoutes } from "../modules/Feedback/feedback.route";


const router = Router();

// Define paths and their route handlers
const moduleRoutes = [
  { path: "/auth", route:AuthRoutes },
  { path: "/user", route: UserRoutes },
  { path: "/course", route: CourseRoutes },
  { path: "/lesson", route: LessonRoutes },
  { path: "/topic", route: TopicRoutes },
  { path: "/enrollment", route: EnrollmentRoutes },
  { path: "/feedback", route: FeedbackRoutes },
];

// Add each route to the router
moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
