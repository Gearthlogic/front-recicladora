import { privateAxiosInstance } from '../axios';
import { ClientType } from '../../constants/enums/client.enum';

export interface CreateClientDTO {
	alias: string;
	firstname: string;
	lastname: string;
	email: string;
	cellphone: string;
	type: ClientType;
}

interface CreateClientPrices {
	clientId: number
	prices: CreatePrices[]
}

interface CreatePrices {
	price: number;
	material: string;
}

interface UpdatePrice {
	price: number;
	id: number;
}

export interface UpdateClientDTO extends CreateClientDTO {
	id: string;
}

export const getClients = async () => {
	return await privateAxiosInstance.get('/client/');
};

export const getClientDetails = async (id: string) => {
	return await privateAxiosInstance.get(`/client/${id}`);
};

export const createNewClient = (body: CreateClientDTO) => {
	return privateAxiosInstance.post('/client', body);
};

export const updateClient = (body: UpdateClientDTO) => {

	return privateAxiosInstance.put('/client', body);
};

export const changeClientState = async (id: number) => {
	return await privateAxiosInstance.patch(`client/${id}/state`);
};

export const createClientPrices = async (body: CreateClientPrices) => {
	return privateAxiosInstance.post('/client/prices', body)
}


export const updateClientPrices = async (body: UpdatePrice[]) => {
	return privateAxiosInstance.put('/client/prices', body)
}
