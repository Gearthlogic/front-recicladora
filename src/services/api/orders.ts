import { Material } from '../../constants/enums/material.enum';
import { OrderState } from '../../constants/enums/orderStates.enum';
import { PaginateAttributes } from '../../constants/types/paginate';
import { privateAxiosInstance } from '../axios';

export interface GetOrdersQueryDTO extends PaginateAttributes {
	pickupDate?: string;
	state?: OrderState[];
}

export const getOrders = (params: GetOrdersQueryDTO) => {
	return privateAxiosInstance.get('/orders', { params });
};

export const getOrderItems = (id: number) => {
	return privateAxiosInstance.get(`/orders/${id}/items`);
};

export interface OrderItemDTO {
	material: Material;
	quantity: number;
	price?: number;
}

interface CreateOrderItemsDTO {
	id: number;
	items: OrderItemDTO[]
}

export const createOrderItems = (data: CreateOrderItemsDTO) => {
	return privateAxiosInstance.post(`/orders/items`, data);
};
