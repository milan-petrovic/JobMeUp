import { axiosInstance, getRequestConfig } from '../api/axios';

export const getAllCompanies = () => {
    return axiosInstance.get('/companies');
};

export const postCompany = (requestData) => {
    return axiosInstance.post('/companies', requestData);
};

export const getCompanyById = (companyId, accesToken) => axiosInstance.get(`/companies/${companyId}`, getRequestConfig(accesToken));

export const putCompany = (requestData) => axiosInstance.put('/companies', requestData);
