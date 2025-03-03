import { useEffect, useState } from "react";
import { useTimeTrackerContext } from "../context/TimeTrackerContext"; 
import {jwtDecode} from "jwt-decode";
const TimeEntryForm: React.FC = () => {
  const { addTimeEntry } = useTimeTrackerContext(); 
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const loadTimeFromStorage = () => {
      const savedStartTime = localStorage.getItem("timeTracker_startTime");
      const savedEndTime = localStorage.getItem("timeTracker_endTime");

      if (savedStartTime) setStartTime(savedStartTime);
      if (savedEndTime) setEndTime(savedEndTime);
    };

    // Pehli dafa load karne ke liye
    loadTimeFromStorage();

    // ✅ Listen for storage changes (even without refresh)
    window.addEventListener("storage", loadTimeFromStorage);

    return () => {
      window.removeEventListener("storage", loadTimeFromStorage);
    };
  }, []);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
  
    if (!startTime || !endTime) {
      setError("Start time aur end time required hain!");
      return;
    }
  
    try {
      // ✅ Token se user_id extract karna
      const token = localStorage.getItem("authToken");
      let userId: number | null = null;
  
      if (token) {
        const decodedToken: any = jwtDecode(token);
        userId = decodedToken?.id || null;
      }
  
      if (!userId) {
        setError("User authentication failed. Please log in again.");
        return;
      }
  
      await addTimeEntry({
        user_id: userId, 
        start_time: startTime,
        end_time: endTime,
        task_description: description,
      });
  
      localStorage.removeItem("timeTracker_startTime");
      localStorage.removeItem("timeTracker_endTime");
  
 
      setStartTime("");
      setEndTime("");
      setDescription("");
    } catch (err) {
      setError("Failed to create time entry.");
    }
  };
  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg border border-gray-200">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
        ⏳ Log Time Entry
      </h2>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block font-medium text-gray-700 mb-2">Start Time:</label>
          <input
            type="datetime-local"
            value={startTime}
            onChange={(e) => {
              setStartTime(e.target.value);
              localStorage.setItem("timeTracker_endTime", e.target.value);
            }}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            required
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700 mb-2">End Time:</label>
          <input
            type="datetime-local"
            value={endTime}
            onChange={(e) => {setEndTime(e.target.value);
              localStorage.setItem("timeTracker_startTime", e.target.value);
            }}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            required
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700 mb-2">Description (optional):</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            rows={3}
            placeholder="Briefly describe the task..."
          />
        </div>

        <button
          type="submit"
          className="w-full p-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all transform hover:scale-105"
        >
          ✅ Save Entry
        </button>
      </form>
    </div>
  );
};

export default TimeEntryForm;
