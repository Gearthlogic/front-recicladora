import { useState, useEffect, memo } from 'react';
import { setMessage } from '../../../../redux/actions/message';
import { useDispatch } from 'react-redux';
import moment from 'moment';

import CurrentOrderstable from './components/table'
import { getOrders } from '../../../../services/api/orders';
import { OrderState } from '../../../../constants/enums/orderStates.enum';
import { startLoading, endLoading } from '../../../../redux/actions/loading/loading';
import transalations from '../../../../assets/translations.json';
import { ClientType } from '../../../../constants/enums/client.enum';
import AccordionCustom from '../../../common/Accordion/AccordionCustom';


interface OrdersData {
    orders: any[];
    client: any[];
    count: number;
}
interface OrdersClient {
    client: any[];
}

const initialstate: OrdersData = {
    orders: [],
    client: [],
    count: 0
}

const OrdersHistory = () => {

    const [page, setPage] = useState(1);
    const [clientsList, setClientsList] = useState<OrdersData>(initialstate);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(startLoading());
        getOrders({
            page,
            // pickupDate: moment().format("YYYY-MM-DD"),
            state: [OrderState.Created, OrderState.PendingToSetTemporaryClientPrice]
        })
            .then(res => {
                const data = res?.data.orders.map((client: any) => {
                    const typeFormat: ClientType = client.client.type
                    const stateFormat: ClientType = client.state
                    return {
                        type: transalations['es-ES'][typeFormat],
                        state: transalations['es-ES'][stateFormat],
                        alias: client.client.alias,
                        id: client.client.id,
                        payableAmount: client.payableAmount,
                        cellphone: client.client.cellphone,
                        email: client.client.email,
                        pickupDate: moment(client.pickupDate).format("DD-MM/YYYY")
                    }
                })
                setClientsList({ orders: data, client: [], count: res.data.count })
            })
            .catch(() => dispatch(setMessage({ action: "Error al cargar la información" }, 'error')))
            .finally(() => dispatch(endLoading()))

    }, [page])

    return (
        <div >
            <AccordionCustom text='Filtrar'>
               <div style={{display:'flex'}}>
                    {/* Poner Multiple Select */}
               </div>
            </AccordionCustom>

            <CurrentOrderstable orders={clientsList.orders} />
        </div>
    )
}

export default memo(OrdersHistory);