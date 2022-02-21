import { Dispatch } from 'redux';
import { login, register } from '../../../services/api/auth';
import { AuthType } from '../../types';

export const actionLogin = (username: String, password: String) => async (dispatch: Dispatch) => {
    const user = await login(username, password);
    dispatch({
        type: AuthType.LOGIN,
        payload: {
            user
        }
    });
}

export const actionRegister = (username: String, password: String) => async (dispatch: Dispatch) => {
    const data = await register(username, password);
    console.log('REGISTRO');
    console.log(data);
    dispatch({
        type: AuthType.REGISTER,
        payload: {
            data
        }
    });
}