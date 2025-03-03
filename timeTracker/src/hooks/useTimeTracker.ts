import { useState, useEffect } from "react";
import { getTimeEntries, createTimeEntry, deleteTimeEntry } from "../services/api";
interface TimeEntry {
    user_id: number;
    start_time: string;
    end_time: string;
    task_description: string;
  }
  
export const useTimeTracker = () => {
    const [timeEntries, setTimeEntries] = useState<TimeEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTimeEntries();
  }, []);

  const fetchTimeEntries = async () => {
    setLoading(true);
    try {
      const data = await getTimeEntries();
      setTimeEntries(data);
    } catch (err) {
      setError("Failed to fetch time entries");
    } finally {
      setLoading(false);
    }
  };

  const addTimeEntry = async (entryData: { user_id: number; start_time: string; end_time: string; task_description: string }) => {
    try {
      const newEntry = await createTimeEntry(entryData);
      setTimeEntries((prevEntries) => [...prevEntries, newEntry]);
    } catch (err) {
      setError("Failed to create time entry");
    }
  };

  const removeTimeEntry = async (id: number) => {
    try {
      await deleteTimeEntry(id);
      setTimeEntries((prevEntries) => prevEntries.filter((entry) => entry.id !== id));
    } catch (err) {
      setError("Failed to delete time entry");
    }
  };

  return { timeEntries, loading, error, addTimeEntry, removeTimeEntry };
};
