import { useSelector } from 'react-redux';

import { User } from '../../../../constants/types/user.type';
import { RootStore } from '../../../../redux';
import { createUserRoutes } from '../../routes/routes';
import Link from './Link';
import styles from './styles.module.css';

const Links = () => {
	const user = useSelector<RootStore, User | undefined>(state => state.auth.user)

	const buildLinks = () => {
		const userRoutes = createUserRoutes(user)

		return userRoutes
			.filter(route => route.isInLayout())
			.map(route =>
				<Link
					key={route.routeProps.path?.toString()}
					to={route.routeProps.path}
					layoutProps={route.layoutProps}
				/>
			);
	};

	return (
		<div className={styles.links}>
			{buildLinks()}
		</div>
	);
};

export default Links;
