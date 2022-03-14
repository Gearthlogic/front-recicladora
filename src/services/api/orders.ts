import { GetOrdersQueryDTO , CreateOrderItemsDTO, ControlOrderItemsDTO} from '../../constants/dto/order.dto';
import { privateAxiosInstance } from '../axios';

export const getOrders = (params: GetOrdersQueryDTO) => {
	return privateAxiosInstance.get('/orders', { params });
};

export const getControllingOrders = () => {
	return privateAxiosInstance.get('/orders/controlling');
};

export const getOrderItems = (id: number) => {
	return privateAxiosInstance.get(`/orders/${id}/items`);
};

export const createOrderItems = (data: CreateOrderItemsDTO) => {
	return privateAxiosInstance.post(`/orders/items`, data);
};

export const controlOrderItem = (data: ControlOrderItemsDTO) => {
	return privateAxiosInstance.patch(`/orders/items/actions/control`, data);
};