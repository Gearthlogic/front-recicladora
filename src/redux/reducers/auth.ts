import { AuthDispatchTypes } from "../actions/auth/types";
import { AuthType } from "../types";

interface authState {
  loggedIn: boolean;
  user: object;
  role: string;
}

const initialState: authState = {
  loggedIn: false,
  user: {},
  role: "",
};

export function authReducer(state: authState = initialState, action: AuthDispatchTypes) {
  switch (action.type) {
    case AuthType.LOGIN:
      return {
        ...state,
        loggedIn: true,
        user: action.payload.user
      };

    case AuthType.GET_USER_DATA:
      return {
        ...state,
        user: {
          ...state.user,
          user: action.payload
        }
      };
    case AuthType.REGISTER:
      /* return {
        ...initialState,
        user: action.payload,
      } */
      return initialState;
    case AuthType.LOGOUT:
      return initialState;
    default:
      return state;
  }
}
