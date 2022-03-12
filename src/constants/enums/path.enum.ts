export enum Path {
	index = '/',
	login = '/login',
	usersList = '/users',
	createUser = '/users/create',
	editUser = '/users/edit',
	clientList = '/clients',
	config = '/config',
	createClient = '/clients/create',
	editClient = '/clients/edit/:id',
	orderList = '/orders',
	viewOrder ='/orders/view-order',
	createOrder = '/orders/create',
	notFound = '/*'
};
