import axios from 'axios';
import { baseRoutes } from '../utils/Constants';

export const axiosInstance = axios.create({
    baseURL: baseRoutes.API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    responseType: 'json',
});

export const getRequestConfig = (token) => {
    return {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    };
};
