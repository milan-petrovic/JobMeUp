import axios from 'axios';
import { ApiUrl } from '../utils/Constants';

export const axiosInstance = axios.create({
    baseURL: ApiUrl,
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
