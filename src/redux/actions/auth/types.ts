import { AuthType } from '../../types';

export interface IactionLogin {
    type: typeof AuthType.LOGIN,
    payload: {
        user: Object
    }
}

export interface IactionRegister {
    type: typeof AuthType.REGISTER
    payload: {
        user: Object
    }
}

export interface IactionLogout {
    type: typeof AuthType.LOGOUT;
}

export type AuthDispatchTypes = IactionLogin | IactionRegister | IactionLogout;
