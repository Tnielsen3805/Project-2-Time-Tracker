import React, { useState } from "react";
import ReportView from "../components/ReportView";

interface TimeEntry {
  startTime: string;
  endTime: string;
  description?: string;
}

const Reports: React.FC = () => {
  const [entries] = useState<TimeEntry[]>([
    {
      startTime: "2024-03-01T08:00:00",
      endTime: "2024-03-01T12:00:00",
      description: "Morning Work Session",
    },
    {
      startTime: "2024-03-01T13:00:00",
      endTime: "2024-03-01T17:00:00",
      description: "Afternoon Work Session",
    },
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 p-10">
      <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-2xl">
        <h1 className="text-3xl font-extrabold text-gray-800 text-center mb-6">
          📊 Time Reports
        </h1>
        <p className="text-lg text-gray-600 text-center mb-4">
          View and analyze your logged work sessions.
        </p>
        <ReportView  />
      </div>
    </div>
  );
};

export default Reports;
