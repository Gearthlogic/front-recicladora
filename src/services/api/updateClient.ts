import { ClientType } from '../../components/LandingFolder/Landing/NewClientForm';
import { privateAxiosInstance } from '../axios';

interface updateClientDTO {
    id: string;
    alias: string;
    firstname: string;
    lastname: string;
    email: string;
    cellphone: string;
    type: ClientType;
}
export const updateClient = (body: updateClientDTO) => {
    return privateAxiosInstance.put('client/', body);
};