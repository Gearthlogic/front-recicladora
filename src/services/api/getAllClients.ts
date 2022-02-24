import { privateAxiosInstance } from '../axios';

export const getAllClients = async () => {
    return await privateAxiosInstance.get('client/');
};