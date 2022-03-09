import {OrderState} from '../../constants/enums/orderStates.enum';
import {PaginateAttributes} from '../../constants/types/paginate';
import {privateAxiosInstance} from '../axios';

export interface GetOrdersQueryDTO extends PaginateAttributes {
	pickupDate?: string;
	state?: OrderState[];
}

export const getOrders = (params: GetOrdersQueryDTO) => {
	// console.log({params})
	return privateAxiosInstance.get('/orders', {params});
};
