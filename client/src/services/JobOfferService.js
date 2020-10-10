import { axiosInstance, getRequestConfig } from "../api/axios";

export const postJobOffer = (requestData, accessToken) => axiosInstance.post('/jobOffers', requestData, getRequestConfig(accessToken));