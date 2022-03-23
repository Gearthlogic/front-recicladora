import { GetOrdersQueryDTO , CreateOrderItemsDTO, PatchControlOrderItemDTO} from '../../constants/dto/order.dto';
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

export const controlOrderItem = (data: PatchControlOrderItemDTO) => {
	return privateAxiosInstance.patch(`/orders/items/actions/control`, data);
};

export const endControlling = (id: number) => {
	return privateAxiosInstance.patch(`/orders/${id}/actions/end_controlling`);
};