import { AuthType } from '../../types';

enum Role {
    Purchaser = 'Purchaser',
    EntryController = 'EntryController',
    Admin = 'Admin',
}

type User = {
    access_token: string;
    user: {
        id: number,
        username: string,
        roles: Role[]
    }
}

export interface IactionLogin {
    type: typeof AuthType.LOGIN,
    payload: {
        user: User
    }
}

export interface IactionRegister {
    type: typeof AuthType.REGISTER
    payload: {
        user: User
    }
}

export interface IactionGetUserData {
    type: typeof AuthType.GET_USER_DATA
    payload: {
        user: User
    }
}

export interface IactionLogout {
    type: typeof AuthType.LOGOUT;
}

export type AuthDispatchTypes = IactionLogin | IactionRegister | IactionLogout | IactionGetUserData;
