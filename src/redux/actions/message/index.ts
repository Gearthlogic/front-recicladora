import { SnackbarProps } from "@material-ui/core"
import { SET_MESSAGE, RESET_MESSAGE } from "../../types/message"


export const setMessage = (snackbarProps: SnackbarProps) => ({
    type: SET_MESSAGE,
    payload: { ...snackbarProps, open: true }
})

export const resetMessage = () => ({ type: RESET_MESSAGE })