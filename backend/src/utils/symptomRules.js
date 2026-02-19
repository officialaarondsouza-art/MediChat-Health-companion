export const analyzeSymptoms = (symptoms) => {
  const s = symptoms.map(symptom => symptom.toLowerCase());

  // 🚨 Emergency symptoms
  if (s.includes("chest pain") || s.includes("shortness of breath")) {
    return {
      condition: "Possible cardiac or respiratory issue",
      severity: "high",
      advice: "Seek emergency medical care immediately"
    };
  }

  // 🤒 Common viral infection
  if (s.includes("fever") && s.includes("cough")) {
    return {
      condition: "Possible viral infection",
      severity: "medium",
      advice: "Rest, stay hydrated, and monitor temperature"
    };
  }

  // 🤢 Digestive issue
  if (s.includes("stomach pain") && s.includes("nausea")) {
    return {
      condition: "Possible digestive issue",
      severity: "low",
      advice: "Eat light food and stay hydrated"
    };
  }

  // 😐 Default case
  return {
    condition: "General discomfort",
    severity: "low",
    advice: "Monitor symptoms and consult a doctor if they persist"
  };
};
