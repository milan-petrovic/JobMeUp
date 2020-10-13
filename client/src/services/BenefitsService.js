import { axiosInstance, getRequestConfig } from '../api/axios';

export const getAllBenefits = () => {
    return axiosInstance.get('/benefits');
};

export const getBenefitById = (benefitId, accessToken) => axiosInstance.get(`/benefits/${benefitId}`, getRequestConfig(accessToken));

export const postBenefit = (requestData, accessToken) => axiosInstance.post('/benefits', requestData, getRequestConfig(accessToken));

export const putBenefit = (requestData, accessToken) => axiosInstance.put('/benefits', requestData, getRequestConfig(accessToken));

export const deleteBenefit = (benefitId, accessToken) => axiosInstance.delete(`/benefits/${benefitId}`, getRequestConfig(accessToken));
