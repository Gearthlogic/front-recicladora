import React from 'react';
import { RouteProps } from 'react-router-dom';

import Landing from '../../LandingFolder/Landing';
import LogIn from '../../AuthFolder/LogIn';
import NotFound from '../../NotFound';
import { Path } from '../../../constants/enums/path.enum';
import Register from '../../AuthFolder/Register';
import NewClientForm from '../../LandingFolder/Landing/NewClientForm';
import ClientList from '../../LandingFolder/Landing/ClientList';
import { Role } from '../../../constants/enums/role.enum';
import { User } from '../../../constants/types/user.type';

export class Route {
	constructor(
		public readonly routeProps: CustomRouteProps,
		public readonly layoutProps?: LayoutProps,
		public readonly allowedRoles?: Role[]
	) { }

	isAllowedTo(userRoles: Role[]) {
		return this.allowedRoles?.some(role => userRoles.includes(role))
	}

	isPrivate(): Boolean {
		return !!this.allowedRoles && this.allowedRoles.length > 0;
	}

	isInLayout(): Boolean {
		return !!this.layoutProps
	}

}

export type LayoutProps = {
	name?: string;
	icon?: React.ComponentType;
};

export interface CustomRouteProps extends RouteProps {
	path?: Path
}


export const routes: Array<Route> = [
	new Route(
		{ path: Path.index, component: Landing, exact: true },
		{ name: 'Inicio' },
	),
	new Route(
		{ path: Path.login, component: LogIn, exact: true },
	),
	new Route(
		{ component: Register, path: Path.register, exact: true },
		undefined,
		[Role.Admin]
	),
	new Route(
		{ component: NewClientForm, path: Path.createClient, exact: true },
		undefined,
		[Role.Admin, Role.Purchaser]
	),
	new Route(
		{ component: ClientList, path: Path.clientList, exact: true },
		{ name: 'Clientes' },
		[Role.Admin, Role.Purchaser]
	),
	new Route(
		{ component: NewClientForm, path: Path.editClient },
		undefined,
		[Role.Admin, Role.Purchaser]
	),
	new Route(
		{ component: NotFound }
	)
];


export const createUserRoutes = (user?: User) => {
	const userRoutes = routes.filter(route =>
		user ? route.isAllowedTo(user.roles) : !route.isPrivate()
	)

	return userRoutes;
}
