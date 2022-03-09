import { Role } from "../../constants/enums/role.enum";
import { privateAxiosInstance } from "../axios";


export const getUsers = async () => {
    const response = await privateAxiosInstance.get('/user');

    return response.data;
}


interface CreateUserDTO {
    username: String,
    password: String,
    roles:  Role[]
}

export const createUser = async (data : CreateUserDTO) => {
    debugger
    const response = await privateAxiosInstance.post('/user', data);

    return response.data;
}