
import { Material } from "../enums/material.enum";
import { OrderState } from "../enums/orderStates.enum";
import { PaginateDTO } from "./paginate.dto";

export interface CreateOrderDTO {
    clientId: number
    pickupDate: string;
}

export interface UpdateOrderPickupDateDTO {
    id: number;
    pickupDate: string;
}

export interface GetOrdersQueryDTO extends PaginateDTO {
    pickupDate?: string;
    state?: OrderState[];
}

export interface OrderMaterialItemDTO {
    material: Material;
    quantity: number;
    price?: number;
}

export interface CreateOrderItemsDTO {
    id: number;
    items: OrderMaterialItemDTO[];
}

export interface ControlOrderItemsDTO {
    id: number;
    material: Material;
    quantity: number;
    price?: number;
}

export interface SetPriceOrderItemDTO {
    id: number;
    price: number;
}