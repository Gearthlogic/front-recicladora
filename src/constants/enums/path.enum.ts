export enum Path {
	index = '/',
	usersList = '/users',
	createUser = '/users/create',
	editUser = '/users/edit',
	clientList = '/clients',
	config = '/config',
	createClient = '/clients/create',
	editClient = '/clients/edit/:id',
	orderList = '/orders',
	viewOrder ='/orders/view',
	createOrder = '/orders/create',
	clientAccount = "/client/account",
	controllingOrderList = '/orders/control',
	notFound = '/*'
};
