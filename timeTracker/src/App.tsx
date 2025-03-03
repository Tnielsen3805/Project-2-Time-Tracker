import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { TimeTrackerProvider } from "./context/TimeTrackerContext";

import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";

const App: React.FC = () => {
  return (
    <AuthProvider>
  <TimeTrackerProvider>
    <Router>
      <div className="flex">
        {localStorage.getItem("authToken") && <Sidebar />}  

        <div className="flex-1 p-6">
          <Routes>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </div>
      </div>
    </Router>
  </TimeTrackerProvider>
</AuthProvider>

  );
};

export default App;
