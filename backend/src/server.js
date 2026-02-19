import dotenv from "dotenv";
import app from "./app.js";
import symptomRoutes from "./routes/symptomRoutes.js";

app.use("/api/symptoms", symptomRoutes);


dotenv.config();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
