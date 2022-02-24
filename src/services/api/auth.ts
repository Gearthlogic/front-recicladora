import { privateAxiosInstance, publicAxiosInstance } from '../axios';
import { Role } from "../../routes/roles";

export const login = async (username: String, password: String) => {
    const response = await publicAxiosInstance.post('/auth/login', {
        username, password
    });

    localStorage.setItem("token", response.data.access_token);

    return response.data;
}


export const profile = async () => {
    return await privateAxiosInstance.get('/auth/profile');
}

export const register = async (user: String, password: String) => {
    const response = await privateAxiosInstance.post('/user', {
        username: user,
        password,
        roles: Role.Purchaser
    });
    return response.data;
}