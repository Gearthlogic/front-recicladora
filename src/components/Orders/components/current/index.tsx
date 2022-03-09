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
    count: number;
}

const initialstate: OrdersData = {
    orders: [],
    count: 0
}


function CurrentOrders() {
    

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
            .then(res => setClientsList(res.data))
            .catch(() => dispatch(setMessage({ message: "Error al cargar la información" })))
            .finally(() => dispatch(endLoading()))

    }, [page])
console.log(clientsList.orders)
    return (
        <div>
            <CurrentOrderstable orders={clientsList.orders} />
        </div>
    )
}

export default memo(CurrentOrders);