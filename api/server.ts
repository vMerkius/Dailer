import { axiosInstance } from "./axios-instance";
import { IUserCredentials } from "./types";

export const registerUser = async (data: IUserCredentials) => {
  try {
    const response = await axiosInstance.post("/auth/mobile/register", data);
    return response.data;
  } catch (error) {
    console.error("Registration error:", error);
    throw error;
  }
};

export const loginUser = async (data: IUserCredentials) => {
  try {
    const response = await axiosInstance.post("/auth/mobile/login", data);
    return response.data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};
