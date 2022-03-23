
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

export interface CreateOrderMaterialItemDTO {
    material: Material;
    quantity: number;
    price?: number;
    unit?: string
}

export interface UpdateOrderMaterialItemDTO extends CreateOrderMaterialItemDTO  {
    id: number;
}

export interface CreateOrderItemsDTO {
    id: number;
    items: CreateOrderMaterialItemDTO[];
}

export interface ControlOrderItemDTO {
    quantity: number,
    unit: string;
}

export interface PatchControlOrderItemDTO {
    id: number;
    material: Material;
    wastePercentage: number;
}

export interface ControlOrderItemDTO extends PatchControlOrderItemDTO {
    quantity: number,
    unit: string;
}

export interface SetPriceOrderItemDTO {
    id: number;
    price: number;
}