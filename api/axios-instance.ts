import axios from "axios";
import Constants from "expo-constants";

const API_URL =
  Constants.expoConfig?.extra?.apiUrl || "http://localhost:3000/api";

export const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

export default axiosInstance;
