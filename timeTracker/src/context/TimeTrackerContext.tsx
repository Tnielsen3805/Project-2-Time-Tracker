import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { getTimeEntries, createTimeEntry, deleteTimeEntry } from "../services/api";



interface TimeEntry {
  id: number;
  user_id: number;
  start_time: string;
  end_time: string;
  task_description: string;
}

interface TimeTrackerContextType {
  timeEntries: TimeEntry[];
  addTimeEntry: (entryData: Omit<TimeEntry, "id">) => Promise<void>;
  removeTimeEntry: (id: number) => Promise<void>;
}

const TimeTrackerContext = createContext<TimeTrackerContextType | undefined>(undefined);

export const TimeTrackerProvider = ({ children }: { children: ReactNode }) => {
  const [timeEntries, setTimeEntries] = useState<TimeEntry[]>([]);

  useEffect(() => {
    fetchTimeEntries();
  }, []);

  const fetchTimeEntries = async () => {
    try {
      const data = await getTimeEntries();
      setTimeEntries(data);
    } catch (error) {
      console.error("Failed to fetch time entries");
    }
  };

  const addTimeEntry = async (entryData: Omit<TimeEntry, "id">) => {
    try {
      const newEntry = await createTimeEntry(entryData);
      setTimeEntries((prevEntries) => [...prevEntries, newEntry]);
    } catch (error) {
      console.error("Failed to create time entry");
    }
  };

  const removeTimeEntry = async (id: number) => {
    try {
      await deleteTimeEntry(id);
      setTimeEntries((prevEntries) => prevEntries.filter((entry) => entry.id !== id));
    } catch (error) {
      console.error("Failed to delete time entry");
    }
  };

  return (
    <TimeTrackerContext.Provider value={{ timeEntries, addTimeEntry, removeTimeEntry }}>
      {children}
    </TimeTrackerContext.Provider>
  );
};

export const useTimeTrackerContext = () => {
  const context = useContext(TimeTrackerContext);
  if (!context) {
    throw new Error("useTimeTrackerContext must be used within a TimeTrackerProvider");
  }
  return context;
};
