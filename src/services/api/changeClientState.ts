import { privateAxiosInstance } from '../axios';

export const changeClientState = async (id: string) => {
    return await privateAxiosInstance.patch(`client/${id}`);
};