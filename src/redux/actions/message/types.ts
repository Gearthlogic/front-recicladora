import { SnackbarProps } from '@material-ui/core';
import { SET_MESSAGE, RESET_MESSAGE } from '../../types/message'

export interface IactionSetMessage {
    type: typeof SET_MESSAGE;
    payload: SnackbarProps;
}

export interface IactionResetMessage {
    type: typeof RESET_MESSAGE;
}

export type LoadingDispatchTypes =
    | IactionSetMessage
    | IactionResetMessage

