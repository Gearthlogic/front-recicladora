import { memo } from 'react';

import { Grid } from '@material-ui/core';
import { GetCurrentOrderDTO } from '../../../../constants/dto/order.dto';
import OrderItem from './OrderItem';

interface OrderListProps {
    orders?: GetCurrentOrderDTO[],
    setOrders: React.Dispatch<React.SetStateAction<GetCurrentOrderDTO[] | undefined>>,
    readFromSerial: Function,
    setSelectedAccountId: React.Dispatch<React.SetStateAction<number | undefined>>,
}

const OrderList = ({ orders, setOrders, readFromSerial, setSelectedAccountId }: OrderListProps) => {

    return (
        <Grid container>
            <Grid container >
                {orders?.map(order => (
                    <OrderItem
                        readFromSerial={readFromSerial}
                        key={order.id}
                        setOrders={setOrders}
                        item={order}
                        setSelectedAccountId={setSelectedAccountId}
                    />
                ))}
            </Grid>
        </Grid>
    )
}

export default memo(OrderList);