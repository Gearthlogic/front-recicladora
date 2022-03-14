import { Grid } from "@material-ui/core";
import { memo } from "react";
import { OrderMaterialItemDTO } from "../../../../../constants/dto/order.dto";

interface ControlOrderItemsFormProps {
    items: OrderMaterialItemDTO[]
}

const ControlOrderItemsForm = ({items} : ControlOrderItemsFormProps ) => {

    return (
        <Grid container>
           {items.map(item => {
               <Grid item >
                   
               </Grid>
           }) }
        </Grid>
    );
}

export default memo( ControlOrderItemsForm);