import React from 'react';

import Statistics from '../components/StatisticsFolder/Statistics';
import Landing from '../components/LandingFolder/Landing';
import LogIn from '../components/LogInFolder/LogIn';
import Home from '../components/HomeFolder/Home';
import NotFound from '../components/NotFound';

import { rolesName } from './roles';
import { paths } from './paths';

const { admin, user } = rolesName;

export interface Route {
	routeProps: RouteProps;
	layoutProps: LayoutProps;
}

export type RouteProps = {
	private: boolean;
	component: React.ComponentType;
	route?: string;
	roles?: Array<string>;
};

export type LayoutProps = {
	name?: string;
	icon?: React.ComponentType;
	inLayout?: boolean;
};

export const routes: Array<Route> = [
	{
		routeProps: { route: paths.index, component: Landing, private: false },
		layoutProps: { name: 'Inicio', inLayout: true },
	},
	{
		routeProps: { route: paths.login, component: LogIn, private: false },
		layoutProps: { name: 'Login' },
	},
	{
		routeProps: { route: paths.home, component: Home, roles: [user, admin], private: true },
		layoutProps: { inLayout: true },
	},
	{
		routeProps: { route: paths.statistics, component: Statistics, private: true, roles: [admin] },
		layoutProps: { inLayout: true },
	},
	{
		routeProps: { component: NotFound, private: false },
		layoutProps: {},
	},
];
