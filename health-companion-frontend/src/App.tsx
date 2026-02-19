import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Chatbot from "./pages/Chatbot";
import SymptomChecker from "./pages/SymptomChecker";
import MetricsPanel from "./components/MetricsPanel";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="chatbot" element={<Chatbot />} />
          <Route path="symptoms" element={<SymptomChecker />} />
          <Route path="metrics" element={<MetricsPanel />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
