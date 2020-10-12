import { axiosInstance, getRequestConfig } from "../api/axios";

export const postJobOffer = (requestData, accessToken) => axiosInstance.post('/jobOffers', requestData, getRequestConfig(accessToken));

export const getAllActiveJobOffersForEmployee = (employeeId, accessToken) => {
    return axiosInstance.get(`/jobOffers/active/employee/${employeeId}`, getRequestConfig(accessToken));
};

export const getAllDeclinedJobOffersForEmployee = (employeeId, accessToken) => {
   return axiosInstance.get(`/jobOffers/declined/employee/${employeeId}`, getRequestConfig(accessToken));
};

export const getAllActiveJobOffersForCompany = (companyId, accessToken) => {
    return axiosInstance.get(`/jobOffers/active/company/${companyId}`, getRequestConfig(accessToken));
};

export const getAllPastJobOffersForCompany = (companyId, accessToken) => {
   return axiosInstance.get(`/jobOffers/past/company/${companyId}`, getRequestConfig(accessToken));
};

export const declineJobOffer = (jobOfferId, accessToken) => {
    return axiosInstance.post(`/jobOffers/decline/${jobOfferId}`, {}, getRequestConfig(accessToken));
};