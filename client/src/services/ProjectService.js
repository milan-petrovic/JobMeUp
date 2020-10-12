import { axiosInstance, getRequestConfig } from '../api/axios';

export const postProject = (requestData, accesToken) => axiosInstance.post('/projects', requestData, getRequestConfig(accesToken));

export const putProject = (requestData, accessToken) => axiosInstance.put('/projects', requestData, getRequestConfig(accessToken));

export const getProjectById = (projectId, accessToken) => axiosInstance.get(`/projects/${projectId}`, getRequestConfig(accessToken));
