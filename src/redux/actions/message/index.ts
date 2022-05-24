import {SnackbarProps} from '@material-ui/core';
import {SET_MESSAGE, RESET_MESSAGE} from '../../types/message';

export const setMessage = (
	snackbarProps: SnackbarProps,
	messagetype: string = 'success'
) => ({
	type: SET_MESSAGE,
	payload: {
		snackbarProps :  {...snackbarProps, open: true }, 
		messagetype: messagetype
	},
});

export const resetMessage = () => ({type: RESET_MESSAGE});
