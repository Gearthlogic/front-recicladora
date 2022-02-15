export const dataFetchReducer = (state: any, action: { type: TYPES; payload?: any }) => {
	switch (action.type) {
		case TYPES.FETCH_INIT:
			return {
				...state,
				isLoading: true,
				isError: false,
			};
		case TYPES.FETCH_SUCCESS:
			return {
				...state,
				isLoading: false,
				isError: false,
				data: action.payload,
			};
		case TYPES.FETCH_FAILURE:
			return {
				...state,
				isLoading: false,
				isError: true,
			};
		default:
			throw new Error();
	}
};

export enum TYPES {
	FETCH_INIT,
	FETCH_SUCCESS,
	FETCH_FAILURE,
}
