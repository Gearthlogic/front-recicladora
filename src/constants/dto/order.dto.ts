
import { ClientType } from "../enums/client.enum";
import { Material } from "../enums/material.enum";
import { OrderState } from "../enums/orderStates.enum";
import { PaginateDTO } from "./paginate.dto";

export interface GetCurrentOrderDTO {
    id: number,
    client: {
        alias: string,
        type: ClientType,
        account: {
            accountId: number
        }
    },
    items: OrderItemDTO[],
    payableAmount: number,
    pickupDate: string;
    state: OrderState,
    transactionId: number
}

export interface OrderItemDTO {
    finalQuantity: number
    id: number
    material: Material
    price: number
    quantity: number
    total: number
    unit: string
    wastePercentage: number
}

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
    initialInputQuantity: number;
    finalInputQuantity: number;
    price?: number;
    unit?: string
}

export interface UpdateOrderMaterialItemDTO extends CreateOrderMaterialItemDTO {
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


