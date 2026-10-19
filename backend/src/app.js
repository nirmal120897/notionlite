import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import { notFound, errorHandler } from "./middlewares/errorMiddleware.js";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check API
app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "Server is healthy and running!",
  });
});

// Routes
app.use("/api/users", userRoutes);

// Error Handling Middlewares
app.use(notFound);
app.use(errorHandler);

export default app;
