import { memo } from 'react';

import { Grid } from '@material-ui/core';
import { GetCurrentOrderDTO } from '../../../../constants/dto/order.dto';
import OrderItem from './OrderItem';

interface OrderListProps {
    orders?: GetCurrentOrderDTO[],
    setOrders: React.Dispatch<React.SetStateAction<GetCurrentOrderDTO[] | undefined>>
}

const OrderList = ({ orders, setOrders }: OrderListProps) => {

    return (
        <Grid container>
            <Grid container >
                {orders?.map(order => (
                    <OrderItem
                        key={order.id}
                        setOrders ={setOrders}
                        item={order}
                    />
                ))}
            </Grid>
        </Grid>
    )
}

export default memo(OrderList);