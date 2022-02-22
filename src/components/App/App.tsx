import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Layout from '../Layout';
import Router from '../Router';
import {getProfileAction, setSavedToken} from '../../redux/actions/auth';

function App() {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(setSavedToken());
		dispatch(getProfileAction());
	}, [dispatch])

	return (
		<BrowserRouter>
			<Layout />
			<Router />
		</BrowserRouter>
	);
}

export default App;
