import { Role } from "../../constants/enums/role.enum";
import { privateAxiosInstance } from "../axios";

export const createUser = async (
    username: String,
    password: String,
    roles:  Role[]
) => {
    const response = await privateAxiosInstance.post('/user', {
        username, password, roles
    });

    return response.data;
}