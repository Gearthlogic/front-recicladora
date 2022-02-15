import { Route } from 'react-router-dom';
import { rolesName } from '../../routes/roles';
import { routes } from '../../routes/routes';

const user = {
	loggedIn: false,
	role: rolesName.user,
};

const Router = () => {
	const constructRoutes = () => {
		let filteredRoutes;
		if (user.loggedIn) {
			filteredRoutes = routes.filter(route => route.routeProps.roles?.includes(user.role));
		} else {
			filteredRoutes = routes.filter(route => !route.routeProps.private);
		}
        return filteredRoutes.map(route => <Route key={route.routeProps.route} {...route.routeProps} />)
	};

	return <>{constructRoutes()}</>;
};

export default Router;
