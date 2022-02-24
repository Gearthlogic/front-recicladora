import { ClientType } from '../../components/LandingFolder/Landing/NewClientForm';
import {privateAxiosInstance} from '../axios';

interface CreateClientDTO {
    alias: string;
    firstname: string;
    lastname: string;
    email: string;
    cellphone: string;
    type: ClientType;
}
export const createNewClient = (body: CreateClientDTO) => {
    return privateAxiosInstance.post('client/', body);
};