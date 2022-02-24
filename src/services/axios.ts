import axios, { AxiosRequestConfig } from 'axios';
import { store } from '../redux';

export interface Request<T> {
    data: T;
}

export type ID = string | number;

const instancesData: AxiosRequestConfig = {
    baseURL: 'https://recicladora.herokuapp.com/',
    headers: {
        'Content-Type': 'application/json',
    }
};

export const privateAxiosInstance = axios.create(instancesData)

export const publicAxiosInstance = axios.create(instancesData);

// Add token to requests
privateAxiosInstance.interceptors.request.use((config) => {
    const { auth: { token } } = store.getState();

    if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});


