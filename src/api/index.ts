import axios, { AxiosInstance } from "axios";
import { DashboardService } from "./services/dashboard";

let axiosInstance: AxiosInstance;

const createAxiosInstance = () => {
  if (!axiosInstance) {
    axiosInstance = axios.create({
      baseURL: process.env.API_URL,
    });
  }
  return axiosInstance;
};

export const api = () => {
  const axiosInstance = createAxiosInstance();
  return new DashboardService(axiosInstance);
};
