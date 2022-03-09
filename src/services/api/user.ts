import { Role } from "../../constants/enums/role.enum";
import { privateAxiosInstance } from "../axios";


export const getUsers = async () => {
    const response = await privateAxiosInstance.get('/user');

    return response.data;
}

interface CreateUserDTO {
    username: String,
    password: String,
    roles: Role[]
}

export const createUser = async (data: CreateUserDTO) => {
    const response = await privateAxiosInstance.post('/user', data);

    return response.data;
}

export const deleteUser = async (id: number) => {
    await privateAxiosInstance.delete('/user/' + id);
}

interface UpdatePasswordDTO {
    id: number;
    password: string;
}

export const updateUserPassword = async (data: UpdatePasswordDTO) => {
    await privateAxiosInstance.patch('/user/password', data);
}

interface UpdateRolesDTO {
    id: number;
    roles: Role[];
}

export const updateUserRoles = async (data: UpdateRolesDTO) => {
    await privateAxiosInstance.patch('/user/roles', data);
}