import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import protectedRoutes from "./routes/protectedRoutes.js";
import metricsRoutes from "./routes/metricsRoutes.js";
import symptomRoutes from "./routes/symptomRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import { errorHandler } from "./middleware/errorMiddleware.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Health Companion Backend Running 🚀");
});

app.use("/api/auth", authRoutes);
app.use("/api/protected", protectedRoutes);
app.use("/api/metrics", metricsRoutes);
app.use("/api/symptoms", symptomRoutes);
app.use("/api/chat", chatRoutes);

app.use(errorHandler);

export default app;
