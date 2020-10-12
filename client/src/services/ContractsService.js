import { axiosInstance, getRequestConfig } from "../api/axios";

export const postContract = (requestData, accessToken) => axiosInstance.post('/contracts', requestData, getRequestConfig(accessToken));

export const getAllActiveContracts = (employeeId, accessToken) => 
    axiosInstance.get(`/contracts/employee/active/${employeeId}`, getRequestConfig(accessToken));

export const getAllPastContracts = (employeeId, accessToken) => 
    axiosInstance.get(`/contracts/employee/past/${employeeId}`, getRequestConfig(accessToken));

export const closeContract = (contractId, accessToken) =>
    axiosInstance.post(`/contracts/close/${contractId}`, {}, getRequestConfig(accessToken));