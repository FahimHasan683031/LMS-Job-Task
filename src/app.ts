import cors from "cors";
import cookieParser from "cookie-parser";
import express, { Application } from "express";
import notFound from "./app/middlewares/notFound";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import router from "./app/routes";

const app: Application = express(); // Initialize express app


// Dynamic Origin Handling
const allowedOrigins = [
  "http://localhost:5173",
  "https://parcel-managment.vercel.app",
  "https://classiccourierbd.com",
];

// Set up CORS
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, origin); // Allow the origin
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // Allow credentials (cookies, sessions)
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "accessToken"],
  })
);

// Preflight requests handling (optional)
app.options("*", cors());

// // Set up CORS to allow specific origins and headers
// app.use(
//   cors({
//     origin: [
//       "http://localhost:5173",
//       "https://parcel-managment.vercel.app",
//       "https://classiccourierbd.com",
//     ],
//     credentials: true, // Allow credentials (cookies, etc.)
//     methods: ["GET", "POST", "PUT", "PATCH", "DELETE"], // Allow these HTTP methods
//     allowedHeaders: ["Content-Type", "Authorization", "accessToken"], // Allowed headers
//   })
// );


app.use(express.json()); // Parse incoming JSON requests
app.use(cookieParser()); // Parse cookies from requests

app.use("/api/v1", router); // Use routes under /api/v1

// Simple check to confirm server is running
app.get("/", (req, res) => {
  res.send("Server is running...");
});

app.use(globalErrorHandler); // Global error handler
app.use(notFound); // 404 handler for undefined routes

export default app; // Export the app for server setup