import React from 'react';

import Statistics from '../components/StatisticsFolder/Statistics';
import Landing from '../components/LandingFolder/Landing';
import LogIn from '../components/AuthFolder/LogIn';
import Home from '../components/HomeFolder/Home';
import NotFound from '../components/NotFound';

import { paths } from './paths';
import Register from '../components/AuthFolder/Register';

export interface Route {
	routeProps: RouteProps;
	layoutProps: LayoutProps;
}

export type RouteProps = {
	private: boolean;
	component: React.ComponentType;
	route?: string;
	roles?: Array<string>;
	path?: string;
	exact?: boolean;
};

export type LayoutProps = {
	name?: string;
	icon?: React.ComponentType;
	inLayout?: boolean;
};

export const routes: Array<Route> = [
	{
		routeProps: { route: paths.index, component: Landing, private: false, path: paths.index, exact: true, roles: ['admin', 'user'] },
		layoutProps: { name: 'Inicio', inLayout: true },
	},
	{
		routeProps: { route: paths.login, component: LogIn, private: false, path: paths.login, exact: true },
		layoutProps: { name: 'Login' },
	},
	{
		routeProps: { route: paths.register, component: Register, private: false, path: paths.register, exact: true },
		layoutProps: { name: 'Register' },
	},
	/* {
		routeProps: { route: paths.home, component: Home, roles: [user, admin], private: true },
		layoutProps: { inLayout: true },
	},
	{
		routeProps: { route: paths.statistics, component: Statistics, private: true, roles: [admin] },
		layoutProps: { inLayout: true },
	}, */
	{
		routeProps: { component: NotFound, private: false },
		layoutProps: {},
	},
];
