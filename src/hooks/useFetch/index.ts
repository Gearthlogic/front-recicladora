import { useState, useReducer, useEffect } from 'react';
import { dataFetchReducer, TYPES } from './reducer';

export const axiosDataExtractionStrategy = async (response: { data: any }) => response.data;
export const fetchDataExtractionStrategy = async (response: { json: () => any }) => response.json();

interface UseFetch {
	initialRequest?: Function;
	initialData?: any;
	dataExtractionStrategy?: Function;
}

const useFetch = ({ initialRequest, initialData = null, dataExtractionStrategy = fetchDataExtractionStrategy }: UseFetch) => {
	const [request, setRequest] = useState(initialRequest);
	const [state, dispatch] = useReducer(dataFetchReducer, {
		isLoading: false,
		isError: false,
		data: initialData,
	});

	useEffect(() => {
		if (request) {
			let didCancel = false;
			const fetchData = async () => {
				if (!didCancel) dispatch({ type: TYPES.FETCH_INIT });
				try {
					const result = await request;
					//console.log(result)
					const data = await dataExtractionStrategy(result);
					if (!didCancel) dispatch({ type: TYPES.FETCH_SUCCESS, payload: data });
				} catch (error) {
					console.error(error);
					if (!didCancel) dispatch({ type: TYPES.FETCH_FAILURE });
				}
			};
			fetchData();
			return () => {
				didCancel = true;
			};
		}
	}, [request, dataExtractionStrategy]);

	const setData = (data: any) => {
		dispatch({ type: TYPES.FETCH_SUCCESS, payload: data });
	};

	return [state, setRequest, setData];
};

export default useFetch;
