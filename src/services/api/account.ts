import {privateAxiosInstance} from '../axios';

export const getAccount = async (id: number) => {
	const response = await privateAxiosInstance.get('/current_account/' + id);

	return response.data;
};

export const postCurrentAccountTransaction = async (body: any) => {
	return await privateAxiosInstance.post('/current_account/debit', body);
};
