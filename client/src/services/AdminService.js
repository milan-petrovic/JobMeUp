import { axiosInstance, getRequestConfig } from "../api/axios";

export const getAllAdmins = (accessToken) => axiosInstance.get('/admins', getRequestConfig(accessToken));

export const postAdmin = (requestData, accessToken) => axiosInstance.post('/admins/register', requestData, getRequestConfig(accessToken));