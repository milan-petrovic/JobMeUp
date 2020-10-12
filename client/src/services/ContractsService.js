import { axiosInstance, getRequestConfig } from "../api/axios";

export const postContract = (requestData, accessToken) => axiosInstance.post('/contracts', requestData, getRequestConfig(accessToken));

export const getAllActiveEmployeesContracts = (employeeId, accessToken) => 
    axiosInstance.get(`/contracts/employee/active/${employeeId}`, getRequestConfig(accessToken));

export const getAllPastEmployeesContracts = (employeeId, accessToken) => 
    axiosInstance.get(`/contracts/employee/past/${employeeId}`, getRequestConfig(accessToken));

export const getAllActiveCompanysContracts = (companyId, accessToken) => 
    axiosInstance.get(`/contracts/company/active/${companyId}`, getRequestConfig(accessToken));

export const getAllPastCompanysContracts = (companyId, accessToken) => 
    axiosInstance.get(`/contracts/company/past/${companyId}`, getRequestConfig(accessToken));

export const closeContract = (contractId, accessToken) =>
    axiosInstance.post(`/contracts/close/${contractId}`, {}, getRequestConfig(accessToken));