import { useSelector } from 'react-redux';
import { Route } from 'react-router-dom';
import { RootStore } from '../../redux';
import { routes } from '../../routes/routes';

const Router = () => {

	const auth = useSelector((state: RootStore) => state.auth);
	console.log(auth)

	const constructRoutes = () => {
		let filteredRoutes;
		if (auth.loggedIn) {
			/* filteredRoutes = routes.filter(route => route.routeProps.roles?.includes(auth.role)); */
			filteredRoutes = routes.filter(route => !route.routeProps.private);
		} else {
			filteredRoutes = routes.filter(route => !route.routeProps.private);
		}
		return filteredRoutes.map(route => <Route key={route.routeProps.route} {...route.routeProps} />)
	};

	return <>{constructRoutes()}</>;
};

export default Router;
