import { useState, useEffect } from "react";
import { loginUser, registerUser, updateEmail, updatePassword } from "../services/api";

export const useAuth = () => {
  const [authToken, setAuthToken] = useState<string | null>(
    localStorage.getItem("authToken")
  );

  useEffect(() => {
    if (authToken) {
      localStorage.setItem("authToken", authToken);
    } else {
      localStorage.removeItem("authToken");
    }
  }, [authToken]);

  const login = async (email: string, password: string) => {
    const response = await loginUser(email, password);
    if (response.token) {
      setAuthToken(response.token);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    return registerUser(name, email, password);
  };

  const logout = () => {
    setAuthToken(null);
  };
  const updateUserEmail = async (newEmail: string) => {
    return updateEmail(newEmail);
  };

  const updateUserPassword = async (newPassword: string) => {
    return updatePassword(newPassword);
  };

  return { authToken, login, register, logout, updateUserEmail, updateUserPassword };
};
