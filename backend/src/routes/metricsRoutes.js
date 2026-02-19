import express from "express";
import { addMetrics, getMetricsHistory } from "../controllers/metricsController.js";
import { authenticate } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/add", authenticate, addMetrics);
router.get("/history", authenticate, getMetricsHistory);

export default router;
