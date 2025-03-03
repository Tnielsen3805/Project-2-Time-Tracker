import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-gray-900 text-white p-6">
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
      <ul className="space-y-4">
        <li>
          <Link to="/dashboard" className="block p-2 rounded hover:bg-gray-700">
            📊 Dashboard
          </Link>
        </li>
        <li>
          <Link to="/settings" className="block p-2 rounded hover:bg-gray-700">
            ⚙️ Settings
          </Link>
        </li>
        <li>
          <button className="block w-full text-left p-2 rounded hover:bg-red-600">
            🚪 Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
