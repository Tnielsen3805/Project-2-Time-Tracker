import { useTimeTrackerContext } from "../context/TimeTrackerContext";

const ReportView: React.FC = () => {
  const { timeEntries } = useTimeTrackerContext(); 

  return (
    <div className="max-w-2xl mx-auto mt-6 p-4 bg-white shadow-md rounded-lg">
    <h2 className="text-black text-xl font-semibold mb-4">📌 Logged Time Entries</h2>
    
    {timeEntries.length === 0 ? (
      <p className="text-gray-500">No time entries found.</p>
    ) : (
      <div className="max-h-80 overflow-y-auto"> 
        <ul className="space-y-4">
          {timeEntries.map((entry) => (
            <li key={entry.id} className="p-4 bg-gray-100 border border-gray-300 rounded-lg shadow-md">
              <p className="text-lg font-semibold text-gray-700">
                <strong className="text-blue-600">📌 Task:</strong> {entry.task_description}
              </p>
              <p className="text-gray-600">
                <strong className="text-green-600">⏳ Start:</strong> {new Date(entry.start_time).toLocaleString()}
              </p>
              <p className="text-gray-600">
                <strong className="text-red-600">⏳ End:</strong> {new Date(entry.end_time).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      </div>
    )}
  </div>
  
  );
};

export default ReportView;
