import { AxiosResponse } from 'axios';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { endLoading, startLoading } from '../../redux/actions/loading/loading';
import { setMessage } from '../../redux/actions/message';

const useFetch = <T>(requestPromise: Promise<AxiosResponse<any, any>>) => {
	const [data, setData] = useState<T>();
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(startLoading());

		requestPromise
			.then(res => setData(res.data))
			.catch(() => setMessage({ message: 'Error al cargar la información' }, 'error'))
			.finally(() => dispatch(endLoading()))

	}, [dispatch, requestPromise]);

	return { data, setData };
};

export default useFetch;
