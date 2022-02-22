import { Dispatch } from 'redux';
import { login, register, profile } from '../../../services/api/auth';
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

export const getProfileAction = () => async (dispatch: Dispatch) => {
    const response = await profile();
    debugger
    dispatch({
        type: AuthType.GET_USER_DATA,
        payload: response.data
    });
}

export const setSavedToken = () => async (dispatch: Dispatch) => {
    const token = localStorage.getItem('token');
    debugger
    dispatch({
        type: AuthType.LOGIN,
        payload: {
            user: {
                access_token: token
            }
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