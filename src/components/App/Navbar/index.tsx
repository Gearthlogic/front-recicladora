import styles from './styles.module.css';
import {Route} from '../routes/routes';
import Link from './Link';
import {memo} from 'react';

interface NavbarProps {
	userRoutes: Route[];
}

const Navbar = ({userRoutes}: NavbarProps) => {
	const buildLinks = () => {
		return userRoutes
			.filter((route) => route.isInLayout())
			.map((route) => (
				<Link
					key={route.routeProps.path?.toString()}
					to={route.routeProps.path}
					layoutProps={route.layoutProps}
				/>
			));
	};

	return (
		<div className={styles.navbar}>
			<div className={styles.links}>
				{buildLinks()}
				<button>LogOut</button>
			</div>
		</div>
	);
};

export default memo(Navbar);
