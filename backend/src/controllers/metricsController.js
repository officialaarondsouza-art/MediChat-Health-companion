import prisma from "../config/db.js";
import { calculateBMI } from "../utils/bmiCalculator.js";


export const addMetrics = async (req, res) => {
  try {
    const { weight, height, systolicBp, diastolicBp } = req.body;
    const userId = req.user.id;

    const bmi = calculateBMI(weight, height);

    const metric = await prisma.healthMetric.create({
      data: {
        userId,
        weight,
        height,
        bmi,
        systolicBp,
        diastolicBp
      }
    });

    res.status(201).json(metric);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getMetricsHistory = async (req, res) => {
  try {
    const userId = req.user.id;

    const metrics = await prisma.healthMetric.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" }
    });

    res.json(metrics);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
