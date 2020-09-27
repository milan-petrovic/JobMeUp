import axios from 'axios';
import { ApiUrl } from '../utils/Constants';

export const axiosInstance = axios.create({
    baseURL: ApiUrl,
    headers: {
        'Content-Type': 'application/json'
    },
    responseType: 'json'
});