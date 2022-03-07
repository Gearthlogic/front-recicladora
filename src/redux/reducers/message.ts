import { SnackbarProps } from '@mui/material'

import { LoadingDispatchTypes } from '../actions/message/types';
import { SET_MESSAGE, RESET_MESSAGE } from '../types/message';

type MessageState = SnackbarProps | null

const initialState: SnackbarProps | null = null;

export function messageReducer(
    state: MessageState = initialState,
    action: LoadingDispatchTypes
) {
    switch (action.type) {
        case SET_MESSAGE: return action.payload;
        case RESET_MESSAGE: return null;
        default: return state;
    }
}
