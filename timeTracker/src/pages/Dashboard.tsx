import React from "react";
import TimeTracker from "../components/TimeTracker";
import TimeEntryForm from "../components/TimeEntryForm";
import ReportView from "../components/ReportView";

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center">
  <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-6">
    ⏳ Time Tracker Dashboard
  </h1>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-4 md:px-6">
    <div className="bg-white shadow-lg rounded-lg p-4 flex flex-col">
      <TimeTracker />
    </div>
    <div className="bg-white shadow-lg rounded-lg p-4 flex flex-col">
      <TimeEntryForm />
    </div>
    <div className="bg-white shadow-lg rounded-lg p-4 flex flex-col">
      <ReportView />
    </div>
  </div>
</div>

  );
};

export default Dashboard;
