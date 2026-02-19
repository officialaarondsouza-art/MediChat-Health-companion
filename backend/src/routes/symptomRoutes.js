import express from "express";
import { checkSymptoms } from "../controllers/symptomController.js";
import { authenticate } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/check", authenticate, checkSymptoms);

export default router;
