import { useSelector } from 'react-redux';
import { Route } from 'react-router-dom';
import { RootStore } from '../../../redux';
import { createUserRoutes } from '../routes/routes';

const Router = () => {
	const user = useSelector((state: RootStore) => state.auth.user);

	const builRoutes = () => {
		const userRoutes = createUserRoutes(user)

		return userRoutes.map(route => (
			<Route
				key={route.routeProps.toString()}
				{...route.routeProps}
			/>
		))
	};

	return <>{builRoutes()}</>;
};

export default Router;
