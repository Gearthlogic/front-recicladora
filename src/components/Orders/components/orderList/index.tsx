import { memo } from 'react';

import { Grid } from '@material-ui/core';
import { GetCurrentOrderDTO } from '../../../../constants/dto/order.dto';
import OrderItem from './OrderItem';
import {  PaymentFetchDetails } from '../../../common/Modal/ClientPaymentModal';

interface OrderListProps {
    orders?: GetCurrentOrderDTO[],
    setOrders: React.Dispatch<React.SetStateAction<GetCurrentOrderDTO[]>>,
    readFromSerial: Function,
    setPaymentFetchDetails: React.Dispatch<React.SetStateAction<PaymentFetchDetails | undefined>>,
}

const OrderList = ({ orders, setOrders, readFromSerial, setPaymentFetchDetails }: OrderListProps) => {

    return (
        <Grid container>
            <Grid container >
                {orders?.map(order => (
                    <OrderItem
                        readFromSerial={readFromSerial}
                        key={order.id}
                        setOrders={setOrders}
                        item={order}
                        setPaymentFetchDetails={setPaymentFetchDetails}
                    />
                ))}
            </Grid>
        </Grid>
    )
}

export default memo(OrderList);