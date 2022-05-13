import { RouteProps } from 'react-router-dom';

import Landing from '../../Landing';
import NotFound from '../../NotFound';
import CreateClient from '../../Clients/CreateClient';
import ClientList from '../../Clients';
import OrderList from '../../Orders';
import ClientAccount from '../../Accounts';
import UsersList from '../../Users';
import CreateUser from '../../Users/create';
import EditUser from '../../Users/edit';
import ControllingOrderList from '../../Orders/control';
import Config from '../../Config';

import { Path } from '../../../constants/enums/path.enum';
import { Role } from '../../../constants/enums/role.enum';
import { User } from '../../../constants/types/user.type';

export class Route {
	constructor(
		public readonly routeProps: CustomRouteProps,
		public readonly allowedRoles?: Role[],
		public readonly layoutProps?: LayoutProps
	) { }

	isAllowedTo(userRoles: Role[]) {
		return this.allowedRoles?.some((role) => userRoles.includes(role));
	}

	isPrivate(): Boolean {
		return !!this.allowedRoles && this.allowedRoles.length > 0;
	}

	isInLayout(): Boolean {
		return !!this.layoutProps;
	}
}

export interface LayoutProps {
	name?: string;
	icon?: React.ComponentType;
}

export interface CustomRouteProps extends RouteProps {
	path: Path;
}

export const routes: Array<Route> = [
	new Route(
		{ path: Path.index, component: Landing, exact: true }
	),
	new Route(
		{ component: ClientList, path: Path.clientList, exact: true },
		[Role.Admin, Role.Purchaser],
		{ name: 'Clientes' }
	),
	new Route(
		{ component: CreateClient, exact: true, path: Path.editClient },
		[Role.Admin, Role.Purchaser]
	),
	new Route(
		{ component: CreateClient, path: Path.createClient, exact: true },
		[Role.Admin, Role.Purchaser]
	),
	new Route(
		{ component: OrderList, path: Path.orderList, exact: true },
		[Role.Admin, Role.Purchaser],
		{ name: 'Ordenes' },
	),
	new Route(
		{ component: ClientAccount, path: Path.clientAccount, exact: true },
		[Role.Admin, Role.Purchaser]
	),
	new Route(
		{ component: ControllingOrderList, path: Path.controllingOrderList, exact: true },
		[Role.EntryController]
	),
	new Route(
		{ component: UsersList, path: Path.usersList, exact: true },
		[Role.Admin],
		{ name: 'Usuarios' }
	),
	new Route(
		{ component: Config, path: Path.config, exact: true },
		[Role.Admin],
		{ name: 'Configuración' }
	),
	new Route(
		{ component: CreateUser, path: Path.createUser, exact: true },
		[Role.Admin]
	),
	new Route(
		{ component: EditUser, path: Path.editUser, exact: true },
		[Role.Admin]
	),
	new Route({ path: Path.notFound, component: NotFound }),
];

export const createUserRoutes = (user?: User) => {
	const userRoutes = routes.filter((route) =>
		(user && route.isAllowedTo(user.roles)) || !route.isPrivate()
	);
	return userRoutes;
};
