import { Outlet, Link } from "react-router-dom";

function Dashboard() {
  return (
    <div className="flex">
      
      {/* Sidebar */}
      <nav className="w-60 bg-slate-800 text-white min-h-screen p-4">
        <h2 className="text-lg font-bold mb-4">Health Companion</h2>

        <ul className="space-y-3">
          <li><Link to="chatbot">🤖 Chatbot</Link></li>
          <li><Link to="symptoms">🩺 Symptom Checker</Link></li>
          <li><Link to="metrics">📊 Health Metrics</Link></li>
        </ul>
      </nav>

      {/* Page Content */}
      <div className="flex-1 p-6">
        <Outlet />
      </div>

    </div>
  );
}

export default Dashboard;
