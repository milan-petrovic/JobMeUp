import { axiosInstance, getRequestConfig } from "../api/axios";

export const getAllAdmins = (accessToken) => axiosInstance.get('/admins', getRequestConfig(accessToken));