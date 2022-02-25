import {privateAxiosInstance} from '../axios';
import {ClientType} from '../../constants/enums/client.enum';

interface CreateClientDTO {
	alias: string;
	firstname: string;
	lastname: string;
	email: string;
	cellphone: string;
	type: ClientType;
}

interface UpdateClientDTO extends CreateClientDTO {
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
