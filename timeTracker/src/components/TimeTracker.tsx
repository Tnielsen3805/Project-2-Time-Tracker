import { useState, useEffect } from "react";

interface TimeEntry {
  startTime: Date;
  endTime?: Date;
  duration?: number;
}

const TimeTracker = () => {
  const [isTracking, setIsTracking] = useState(false);
  const [timeEntries, setTimeEntries] = useState<TimeEntry[]>([]);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [timerId, setTimerId] = useState<number | null>(null);


  useEffect(() => {
    if (isTracking && startTime) {
      const interval = setInterval(() => {
        const now = new Date();
        setElapsedTime(Math.floor((now.getTime() - startTime.getTime()) / 1000));
      }, 1000);

      setTimerId(interval);
    } else {
      if (timerId) clearInterval(timerId);
    }

    return () => {
      if (timerId) clearInterval(timerId);
    };
  }, [isTracking, startTime]);

  const handleStart = () => {
    setIsTracking(true);
    const now = new Date();
    setStartTime(now);
    setElapsedTime(0); 
  };

  const handleStop = () => {
    if (!startTime) return;

    setIsTracking(false);
    const endTime = new Date();
    const duration = Math.floor((endTime.getTime() - startTime.getTime()) / 1000);

    setTimeEntries([...timeEntries, { startTime, endTime, duration }]);
    setStartTime(null);
    setElapsedTime(0);
    
    if (timerId) clearInterval(timerId);

    localStorage.setItem("timeTracker_startTime", startTime.toISOString());
    localStorage.setItem("timeTracker_endTime", endTime.toISOString());
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-gradient-to-br from-gray-50 to-gray-200 shadow-lg rounded-xl">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">⏳ Time Tracker</h2>

      <div className="flex flex-col items-center">
        <p className="text-4xl font-semibold text-blue-600">{elapsedTime} s</p>
        <p className="text-gray-500 text-sm mt-1">Elapsed Time</p>
      </div>

      <div className="flex justify-center space-x-4 mt-6">
        <button
          onClick={handleStart}
          className={`px-6 py-2 text-white font-semibold rounded-lg transition-all ${
            isTracking ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
          }`}
          disabled={isTracking}
        >
          Start
        </button>
        <button
          onClick={handleStop}
          className={`px-6 py-2 text-white font-semibold rounded-lg transition-all ${
            !isTracking ? "bg-gray-400 cursor-not-allowed" : "bg-red-600 hover:bg-red-700"
          }`}
          disabled={!isTracking}
        >
          Stop
        </button>
      </div>

      <h3 className="text-xl font-semibold mt-8 text-gray-700">📌 Time Entries</h3>
      <ul className="mt-4 space-y-3">
        {timeEntries.length === 0 ? (
          <p className="text-gray-500 text-sm">No entries yet. Start tracking time!</p>
        ) : (
          timeEntries.map((entry, index) => (
            <li key={index} className="p-4 bg-white border-l-4 border-blue-500 shadow-sm rounded-lg flex justify-between items-center">
              <div>
                <p className="font-medium text-gray-700">
                  {entry.startTime.toLocaleTimeString()} - {entry.endTime?.toLocaleTimeString()}
                </p>
                <p className="text-sm text-gray-500">{entry.duration} seconds</p>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default TimeTracker;
