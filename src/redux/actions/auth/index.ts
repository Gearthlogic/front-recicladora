import { Dispatch } from 'redux';
import { login, profile } from '../../../services/api/auth';
import { AuthType } from '../../types';

export const actionLogin = (username: String, password: String) => async (dispatch: Dispatch) => {
    const response = await login(username, password);

    dispatch({
        type: AuthType.LOGIN,
        payload: {
            token: response.data.access_token,
            user: response.data.user
        }
    });
}

export const getProfileAction = () => async (dispatch: Dispatch) => {
    dispatch(setSavedToken());
    const response = await profile();
    dispatch({
        type: AuthType.GET_PROFILE,
        payload: response.data
    });
}

export const setSavedToken = () => {
    const token = localStorage.getItem('token');
    return {
        type: AuthType.LOGIN,
        payload: { token }
    };
}
