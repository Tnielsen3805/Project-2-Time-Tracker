import axios from "axios";

const API_URL = "http://localhost:3001/users"; 
const API_BASE_URL = "http://localhost:3001/api/time-entries";

export const loginUser = async (email: string, password: string) => {
  const response = await axios.post(`${API_URL}/login`, { email, password });
  return response.data;
};

export const registerUser = async (name: string, email: string, password: string) => {
  const response = await axios.post(`${API_URL}/register`, { name, email, password });
  return response.data;
};

export const logoutUser = async () => {
  await axios.post(`${API_URL}/logout`);
};




const getAuthToken = () => localStorage.getItem("authToken");

export const getTimeEntries = async () => {
  try {
    const token = getAuthToken();
    if (!token) throw new Error("No auth token found");

    const response = await axios.get(API_BASE_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching time entries:", error);
    throw new Error("Failed to fetch time entries");
  }
};


export const createTimeEntry = async (entryData: { user_id: number; start_time: string; end_time: string; task_description: string }) => {
  try {
    const token = getAuthToken();
    const response = await axios.post(`${API_BASE_URL}/add`, entryData, {
      headers: {
        Authorization: `Bearer ${token}`, 
        "Content-Type": "application/json",
      }});
    return response.data;
  } catch (error) {
    throw new Error("Error creating time entry");
  }
};

export const deleteTimeEntry = async (id: number) => {
  try {
    await axios.delete(`${API_BASE_URL}/${id}`);
  } catch (error) {
    throw new Error("Error deleting time entry");
  }
};


export const updateEmail = async (newEmail: string) => {
  const token = getAuthToken();
  if (!token) throw new Error("No auth token found");

  const response = await axios.put(
    `${API_URL}/update-email`,
    { newEmail },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const updatePassword = async (newPassword: string) => {
  const token = getAuthToken();
  if (!token) throw new Error("No auth token found");

  const response = await axios.put(
    `${API_URL}/update-password`,
    { newPassword },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};