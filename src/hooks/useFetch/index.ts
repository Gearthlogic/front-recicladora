import { AxiosResponse } from 'axios';
import { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { endLoading, startLoading } from '../../redux/actions/loading/loading';
import { setMessage } from '../../redux/actions/message';

const useFetch = <T>(requestPromise: Promise<AxiosResponse<T, any>>) => {
	const [data, setData] = useState<T>();
	const dispatch = useDispatch();

	const fetchCallback = useCallback(async () => {
		dispatch(startLoading());
		try {
			const res = await requestPromise;
			// no borrar . deja de funcionar dios sabe por que
			console.log(res.data)
			setData(res.data)
		} catch (error) {
			dispatch(setMessage({ message: 'Error al cargar la información' }, 'error'))
		} finally {
			dispatch(endLoading());
		}
	}, [dispatch, requestPromise])

	useEffect(() => { fetchCallback() }, [fetchCallback]);

	return { data, setData, fetchCallback };
};

export default useFetch;
