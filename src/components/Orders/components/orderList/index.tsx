import { memo } from 'react';

import { Grid } from '@material-ui/core';
import { GetCurrentOrderDTO } from '../../../../constants/dto/order.dto';
import OrderItem from './OrderItem';

interface OrderListProps {
    orders?: GetCurrentOrderDTO[],
    setOrders: React.Dispatch<React.SetStateAction<GetCurrentOrderDTO[] | undefined>>,
    readFromSerial: Function
}

const OrderList = ({ orders, setOrders, readFromSerial }: OrderListProps) => {

    return (
        <Grid container>
            <Grid container >
                {orders?.map(order => (
                    <OrderItem
                        readFromSerial={readFromSerial}
                        key={order.id}
                        setOrders={setOrders}
                        item={order}
                    />
                ))}
            </Grid>
        </Grid>
    )
}

export default memo(OrderList);