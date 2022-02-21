import axios from 'axios';
import { store } from '../redux';


export interface Request<T> {
    data: T;
}

export type ID = string | number;

const privateAxiosInstance = axios.create({
    baseURL: 'https://recicladora.herokuapp.com/',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const publicAxiosInstance = axios.create({
    baseURL: 'https://recicladora.herokuapp.com/',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add token to requests
privateAxiosInstance.interceptors.request.use((config) => {
    /*     const {
            auth: { user },
        } = store.getState();
    
        if (user.access_token && config.headers) {
            config.headers.Authorization = `Bearer ${user.access_token}`;
        } */
    if (config.headers) {
        config.headers.Authorization = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoyLCJ1c2VybmFtZSI6ImJyYWlhbmRldjEyMyIsInJvbGVzIjpbIkFkbWluIl19LCJzdWIiOjIsImlhdCI6MTY0NTQ2Nzk5MywiZXhwIjoxNjQ1NTU0MzkzfQ.ovpIBcG1xRtBZIQL7NoWjKOd3kLaEfhrhyGp3BlAFE8`;
    }
    return config;
});


export default privateAxiosInstance;
