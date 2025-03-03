import React, { useState } from "react";
import { useAuthContext } from "../context/AuthContext";

const Settings: React.FC = () => {
  const { updateUserEmail, updateUserPassword } = useAuthContext();
  const [email, setEmail] = useState("user@example.com");
  const [password, setPassword] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      if (email) {
        await updateUserEmail(email);
      }
      if (password) {
        await updateUserPassword(password);
      }
      setMessage("Settings updated successfully!");
    } catch (error) {
      setMessage("Failed to update settings");
    }
    setLoading(false);
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-6 ${darkMode ? "bg-gray-900" : "bg-gray-100"}`}>
      <div className={`max-w-2xl w-full p-8 shadow-xl rounded-2xl transition-all duration-300 
        ${darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"}`}>
        
        <h1 className="text-3xl font-extrabold text-center mb-6">⚙️ Settings</h1>
        {message && <p className="text-center text-green-500 mb-4">{message}</p>}

        <form onSubmit={handleSave} className="space-y-6">
          <div>
            <label className="block font-medium mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none 
                dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">New Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none 
                dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>

          <div className="flex items-center justify-between p-3 bg-gray-200 dark:bg-gray-700 rounded-lg">
            <span className="font-medium">Enable Dark Mode</span>
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={darkMode}
                onChange={() => setDarkMode(!darkMode)}
                className="hidden"
              />
              <div className={`w-10 h-5 rounded-full flex items-center p-1 transition-all 
                ${darkMode ? "bg-blue-600" : "bg-gray-400"}`}>
                <div className={`w-4 h-4 bg-white rounded-full transform transition-all 
                  ${darkMode ? "translate-x-5" : "translate-x-0"}`}></div>
              </div>
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 
              transition-all focus:ring-2 focus:ring-blue-500 focus:outline-none"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Settings;
