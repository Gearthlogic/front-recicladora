import {AuthType} from '../../types';

import {User} from '../../../constants/types/user.type';
import {AuthState} from '../../reducers/auth';

export interface IactionLogin {
	type: typeof AuthType.LOGIN;
	payload: AuthState;
}

export interface IactionLogOut {
	type: typeof AuthType.LOGOUT;
	payload: AuthState;
}

export interface IactionGetUserData {
	type: typeof AuthType.GET_PROFILE;
	payload: User;
}

export interface IactionLogout {
	type: typeof AuthType.LOGOUT;
}

export type AuthDispatchTypes =
	| IactionLogin
	| IactionLogout
	| IactionGetUserData;
