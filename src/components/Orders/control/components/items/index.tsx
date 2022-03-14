import { Grid } from "@material-ui/core";
import { memo } from "react";

import { OrderMaterialItemDTO } from "../../../../../constants/dto/order.dto";
import Item from './item';

interface ControlOrderItemsFormProps {
    items: OrderMaterialItemDTO[]
}

const ControlOrderItemsForm = ({items} : ControlOrderItemsFormProps ) => {
    return (
        <Grid container>
           {items.map(item => <Item key={item.id} {...item} />) }
        </Grid>
    );
}

export default memo( ControlOrderItemsForm);