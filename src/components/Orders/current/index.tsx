import { useState, useEffect, memo } from 'react';
import { setMessage } from '../../../redux/actions/message';
import { useDispatch } from 'react-redux';
import moment from 'moment';

import CurrentOrderstable from './components/table'
import { getOrders } from '../../../services/api/orders';
import { OrderState } from '../../../constants/enums/orderStates.enum';
import { startLoading, endLoading } from '../../../redux/actions/loading/loading';
import { number } from 'yup/lib/locale';

interface OrdersData {
    orders: any[];
    count: number;
}

const initialstate : OrdersData = {
    orders: [],
    count: 0
}


function CurrentOrders() {
    const [page, setPage] = useState(1);
    const [data, setData] = useState<OrdersData>(initialstate);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(startLoading());
        getOrders({
            page,
            pickupDate: moment().toISOString(),
            state: [OrderState.Created, OrderState.PendingToSetTemporaryClientPrice]
        })
            .then(res => setData(res.data))
            .catch(() => dispatch(setMessage({ message: "Error al cargar la información" })))
            .finally(() => dispatch(endLoading()))

    }, [page])

    return (
        <CurrentOrderstable orders={data.orders} />
    )
}

export default memo(CurrentOrders);