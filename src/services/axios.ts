import axios, { AxiosRequestConfig } from 'axios';
import { store } from '../redux';

export interface Request<T> {
    data: T;
}

export type ID = string | number;

const baseURL =  'https://recicladora.herokuapp.com/' 
//const baseURL = 'http://localhost:4000'

const instancesData: AxiosRequestConfig = {
    baseURL,
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


