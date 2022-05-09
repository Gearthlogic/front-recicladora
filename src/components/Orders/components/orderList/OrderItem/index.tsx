import {  Divider, Grid, Paper, Typography } from "@material-ui/core";
import {   memo, ReactElement } from "react";

import { GetCurrentOrderDTO } from "../../../../../constants/dto/order.dto";
import { OrderState } from "../../../../../constants/enums/orderStates.enum";
import CreateItemsForm from './components/CreateItemsForm';

interface  OrderItemProps{
    item: GetCurrentOrderDTO,
    setOrders: React.Dispatch<React.SetStateAction<GetCurrentOrderDTO[] | undefined>>
}

function OrderItem({item, setOrders}: OrderItemProps) {
    const { id, state, client: {type, alias} } = item;

    function orderItemsComponentFactory(){

        const stateComponentMap: { [key in OrderState]?: ReactElement } = {
            [OrderState.Created]: <CreateItemsForm setOrders={setOrders} id={id} type={type} />
        }
    
        return stateComponentMap[state];
    }

    return (
        <Paper style={{ width: '100%', margin: '10px 0', padding: 10 }} >
            <Grid container flexDirection="row" >
                <Grid item flexDirection="column" sm={2} >
                    <Typography> Orden N°{id} </Typography>
                    <Typography> Cliente: {alias} </Typography>
                </Grid>
                <Divider orientation="vertical" flexItem />
                <Grid marginLeft={2} item flexDirection="column" sm={8} >
                    {orderItemsComponentFactory()}
                </Grid>
            </Grid >
        </Paper>
    )
}

export default memo(OrderItem);