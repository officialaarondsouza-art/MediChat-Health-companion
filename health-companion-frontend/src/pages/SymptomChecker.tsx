import { useState } from "react";
import api from "../api/axios";

type SymptomResult = {
  condition: string;
  severity: string;
  doctor: string;
  advice: string;
};

export default function SymptomChecker() {
  const [symptoms, setSymptoms] = useState("");
  const [result, setResult] = useState<SymptomResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const checkSymptoms = async () => {
    if (!symptoms.trim()) return;

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await api.post("/symptoms/check", {
        symptoms: symptoms,
      });

      setResult(response.data);

    } catch (err) {
      console.error(err);
      setError("Error checking symptoms");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-6 bg-white shadow-md rounded-lg p-6">
      <h1 className="text-2xl font-bold mb-4">Symptom Checker</h1>

      {/* Input */}
      <textarea
        value={symptoms}
        onChange={(e) => setSymptoms(e.target.value)}
        placeholder="Enter symptoms (e.g. fever, headache, chest pain)"
        className="w-full border rounded p-3 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-green-400"
      />

      {/* Button */}
      <button
        onClick={checkSymptoms}
        disabled={loading}
        className="mt-4 bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded disabled:opacity-50"
      >
        {loading ? "Checking..." : "Check Symptoms"}
      </button>

      {/* Error */}
      {error && (
        <div className="mt-4 bg-red-100 text-red-700 p-3 rounded">
          {error}
        </div>
      )}

      {/* Result */}
      {result && (
        <div className="mt-6 bg-gray-100 p-4 rounded-lg">
          <p className="mb-2">
            <strong>Possible Condition:</strong> {result.condition}
          </p>

          <p className="mb-2">
            <strong>Severity:</strong>{" "}
            <span
              className={`font-semibold ${
                result.severity === "High"
                  ? "text-red-600"
                  : result.severity === "Medium"
                  ? "text-yellow-600"
                  : "text-green-600"
              }`}
            >
              {result.severity}
            </span>
          </p>

          <p className="mb-2">
            <strong>Doctor Visit Needed:</strong> {result.doctor}
          </p>

          <p className="mb-2">
            <strong>Advice:</strong> {result.advice}
          </p>

          <p className="text-sm text-gray-500 mt-3">
            This is not a medical diagnosis. Please consult a doctor.
          </p>
        </div>
      )}
    </div>
  );
}
