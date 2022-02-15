import { rolesName } from '../../../routes/roles';
import { routes } from '../../../routes/routes';
import Link from './Link';
import styles from './styles.module.css';

const user = {
	loggedIn: false,
	role: rolesName.user,
};

const Links = () => {
	const constructLinks = () => {
		let filteredRoutes;
		if (user.loggedIn) {
			filteredRoutes = routes.filter(route => route.routeProps.roles?.includes(user.role));
		} else {
			filteredRoutes = routes.filter(route => !route.routeProps.private);
		}
		const inLayoutRoutes = filteredRoutes.filter(route => route?.layoutProps.inLayout);

		return inLayoutRoutes.map(route => <Link key={route.routeProps.route} route={route} />);
	};

	return (
		<div className={styles.links}>
			{constructLinks()}
		</div>
	);
};

export default Links;
