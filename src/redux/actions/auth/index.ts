import {Dispatch} from 'redux';
import {login, profile} from '../../../services/api/auth';
import {AuthType} from '../../types';

export const actionLogin =
	(username: String, password: String, callback: () => any) =>
	async (dispatch: Dispatch) => {
		const data = await login(username, password);
		dispatch({
			type: AuthType.LOGIN,
			payload: {
				token: data.access_token,
				user: data.user,
			},
		});

		callback();
	};

export const actionLogOut =
	(callback: () => any) => async (dispatch: Dispatch) => {
		dispatch({
			type: AuthType.LOGOUT,
		});
		callback();
	};

export const getProfileAction =
	(callback: () => any) => async (dispatch: Dispatch) => {
		dispatch(setSavedToken());
		try {
			const response = await profile();
			dispatch({
				type: AuthType.GET_PROFILE,
				payload: response.data,
			});
		} catch {
		} finally {
			callback();
		}
	};

export const setSavedToken = () => {
	const token = localStorage.getItem('token');
	return {
		type: AuthType.LOGIN,
		payload: {token},
	};
};
