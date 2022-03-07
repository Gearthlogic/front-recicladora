import { useEffect, useMemo, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Snackbar } from '@material-ui/core'

import Navbar from './Navbar';
import Router from './Router';
import { getProfileAction } from '../../redux/actions/auth';
import { createUserRoutes } from './routes/routes';
import { RootStore } from '../../redux';
import Loader from '../common/Loader/Loader';
import { resetMessage } from '../../redux/actions/message';

function App() {
	const [initializing, setInitializing] = useState(true);
	const { user, loading, snackbar } = useSelector((state: RootStore) => ({
		user: state.auth.user,
		loading: state.loader.loading,
		snackbar: state.snackbar
	}));
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getProfileAction(() => setInitializing(false)))
	}, [dispatch])

	const userRoutes = useMemo(() => createUserRoutes(user), [user])
	console.log(snackbar)
	return (
		<BrowserRouter>
			{loading && <Loader />}
			{!initializing && (
				<>
					<Navbar userRoutes={userRoutes} />
					<Router userRoutes={userRoutes} />
				</>
			)}
			< Snackbar
				autoHideDuration={2000}
				anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
				onClose={() => dispatch(resetMessage())}
				{...snackbar}
			/>
		</BrowserRouter>
	);
}

export default App;
