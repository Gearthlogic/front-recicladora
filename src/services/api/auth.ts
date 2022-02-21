import axios from "axios";
import { Role } from "../../routes/roles";

export const login = async (user: String, password: String) => {
    const response = await axios.post('https://recicladora.herokuapp.com/auth/login', {
        username: user,
        password
    });
    localStorage.setItem("token", response.data.access_token);
    return response.data.user;
}

export const register = async (user: String, password: String) => {
    const response = await axios.post('https://recicladora.herokuapp.com/user', {
        username: user,
        password,
        roles:Role.Purchaser
    });
    return response.data;
}