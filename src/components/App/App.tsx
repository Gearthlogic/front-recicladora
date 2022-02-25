import { useEffect, useMemo, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from './Navbar';
import Router from './Router';
import { getProfileAction } from '../../redux/actions/auth';
import { createUserRoutes } from './routes/routes';
import { RootStore } from '../../redux';

function App() {
	const [initializing, setInitializing] = useState(true);
	const user = useSelector((state: RootStore) => state.auth.user);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getProfileAction(() => setInitializing(false)))
	}, [dispatch])

	const userRoutes = useMemo(() => createUserRoutes(user), [user])

	return (
		<BrowserRouter>
			{!initializing && (
				<>
					<Navbar userRoutes={userRoutes} />
					<Router userRoutes={userRoutes} />
				</>
			)}
		</BrowserRouter>
	);
}

export default App;
