import privateAxiosInstance from '../axios';


export const changeClientType = async (id: string) => {
    return await privateAxiosInstance.patch(`client/${id}`);
};