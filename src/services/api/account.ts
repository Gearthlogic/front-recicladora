import { PostPaymentDTO } from '../../constants/dto/account.dto';
import {privateAxiosInstance} from '../axios';

export const getAccount = async (id: number) => {
	const response = await privateAxiosInstance.get('/current_account/' + id);

	return response.data;
};

export const getPositiveBalanceAccounts = async () => {
	const response = await privateAxiosInstance.get('/current_account/positive_balance');

	return response.data;
};

export const postCurrentAccountTransaction = async (body: any) => {
	return await privateAxiosInstance.post('/current_account/debit', body);
};

export const getPendingTransactions = async (accountId: number) => {
	return await privateAxiosInstance.get(`/current_account/${accountId}/pending`, );
};

export const postCancellingPayment = async (body: PostPaymentDTO) => {
	return await privateAxiosInstance.post('/current_account/payment', body);
};

export const getPaymentInfoFromTransaction = async (transactionId: number) => {
	return await privateAxiosInstance.get(`/current_account/${transactionId}/payment`, );
};
