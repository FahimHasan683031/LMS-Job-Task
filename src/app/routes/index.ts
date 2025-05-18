import { Router } from "express";
import { AuthRoutes } from "../modules/auth/auth.rout";

const router = Router(); // Create a new Router instance

// Define paths and their route handlers
const moduleRoutes = [
  { path: "/auth", route: AuthRoutes },

];

// Add each route to the router
moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router; // Export the router to be used in the main app
