import {RouteProps} from 'react-router-dom';

import Landing from '../../Landing/Landing';
import LogIn from '../../Login/LogIn';
import NotFound from '../../NotFound';
import CreateClient from '../../Clients/CreateClient';
import ClientList from '../../Clients';
import OrderList from '../../Orders';
import OrderView from '../../Orders/view';
import CreateOrder from '../../Orders/create';
import UsersList from '../../Users';
import CreateUser from '../../Users/create';
import EditUser from '../../Users/edit';

import {Path} from '../../../constants/enums/path.enum';
import {Role} from '../../../constants/enums/role.enum';
import {User} from '../../../constants/types/user.type';

export class Route {
	constructor(
		public readonly routeProps: CustomRouteProps,
		public readonly layoutProps?: LayoutProps,
		public readonly allowedRoles?: Role[]
	) {}

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
		{path: Path.index, component: Landing, exact: true},
		undefined,
		Object.values(Role)
	),
	new Route({path: Path.login, component: LogIn, exact: true}),
	new Route(
		{component: ClientList, path: Path.clientList, exact: true},
		{name: 'Clientes'},
		[Role.Admin, Role.Purchaser]
	),
	new Route(
		{component: CreateClient, exact: true, path: Path.editClient},
		undefined,
		[Role.Admin, Role.Purchaser]
	),
	new Route(
		{component: CreateClient, path: Path.createClient, exact: true},
		undefined,
		[Role.Admin, Role.Purchaser]
	),
	new Route({component: CreateOrder, path: Path.createOrder}, undefined, [
		Role.Admin,
		Role.Purchaser,
	]),
	new Route(
		{component: OrderList, path: Path.orderList, exact: true},
		{name: 'Ordenes'},
		[Role.Admin, Role.Purchaser]
	),
	new Route({component: OrderView, path: Path.viewOrder}, undefined, [
		Role.Admin,
		Role.Purchaser,
	]),
	new Route(
		{component: UsersList, path: Path.usersList, exact: true},
		{name: 'Usuarios'},
		[Role.Admin]
	),
	new Route(
		{component: CreateUser, path: Path.createUser, exact: true},
		undefined,
		[Role.Admin]
	),
	new Route(
		{component: EditUser, path: Path.editUser, exact: true},
		undefined,
		[Role.Admin]
	),
	new Route({path: Path.notFound, component: NotFound}),
];

export const createUserRoutes = (user?: User) => {
	const userRoutes = routes.filter((route) =>
		user ? route.isAllowedTo(user.roles) : !route.isPrivate()
	);
	return userRoutes;
};
