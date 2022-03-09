export enum Path {
	index = '/',
	login = '/login',
	usersList = '/users',
	createUser = '/users/create',
	editUser = '/users/edit/:id',
	clientList = '/clients',
	createClient = '/clients/create',
	editClient = '/clients/edit/:id',
	orderList = '/orders',
	createOrder = '/orders/create',
	notFound = '/*'
};
