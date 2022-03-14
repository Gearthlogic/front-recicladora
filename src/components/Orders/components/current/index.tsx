import { useState, useEffect, memo } from 'react';
import { setMessage } from '../../../../redux/actions/message';
import { useDispatch } from 'react-redux';
import moment from 'moment';

import CurrentOrderstable from './components/table'
import { getOrders } from '../../../../services/api/orders';
import { OrderState } from '../../../../constants/enums/orderStates.enum';
import { startLoading, endLoading } from '../../../../redux/actions/loading/loading';

interface OrdersData {
    orders: any[];
    client: any[];
    count: number;
}

const initialstate: OrdersData = {
    orders: [],
    client: [],
    count: 0
}

const CurrentOrders = () => {

    const [page, setPage] = useState(1);
    const [clientsList, setClientsList] = useState<OrdersData>(initialstate);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(startLoading());
        getOrders({
            page,
            pickupDate: moment().format("YYYY-MM-DD"),
            state: [OrderState.Created, OrderState.PendingToSetTemporaryClientPrice]
        })
            .then(res => {
                
                const data = res?.data.orders.map((order: any) => {
                    return {
                        orderId: order.id,
                        alias: order.client.alias,
                        state: order.state,
                        id: order.client.id,
                        address: `${order.client.address.street} ${order.client.address.streetNumber}`,
                        type: order.client.type,
                    }
                })
                setClientsList({ orders: data, client: [], count: res.data.count })
            })
            .catch(() => dispatch(setMessage({ action: "Error al cargar la información" }, 'error')))
            .finally(() => dispatch(endLoading()))

    }, [page, dispatch])

    return (
        <div>
            <CurrentOrderstable orders={clientsList.orders} />
        </div>
    )
}

export default memo(CurrentOrders);