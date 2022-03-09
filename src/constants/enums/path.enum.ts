export enum Path {
	index = '/',
	login = '/login',
	createUser = '/users/create',
	clientList = '/clients',
	createClient = '/clients/create',
	editClient = '/clients/edit/:id',
	orderList = '/orders',
	viewOrder ='/orders/view-order',
	createOrder = '/orders/create',
	notFound = '/*'
};
