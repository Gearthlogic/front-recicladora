import { useEffect, useMemo, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from './Navbar';
import Router from './Router';
import { getProfileAction } from '../../redux/actions/auth';
import { createUserRoutes } from './routes/routes';
import { RootStore } from '../../redux';
import { startLoading } from '../../redux/actions/loading/loading';
import Loader from '../common/Loader/Loader';

function App() {
	const [initializing, setInitializing] = useState(true);
	const user = useSelector((state: RootStore) => state.auth.user);
	const isLoading = useSelector((state: RootStore) => state.loader.loading)
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getProfileAction(() => setInitializing(false)))
	}, [dispatch])

	const userRoutes = useMemo(() => createUserRoutes(user), [user])

	return (
		<BrowserRouter>
			{isLoading && <Loader />}
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
