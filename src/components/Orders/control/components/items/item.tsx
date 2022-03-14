import { Grid } from "@material-ui/core";
import { memo } from "react";

import { OrderMaterialItemDTO } from "../../../../../constants/dto/order.dto";


function ItemControlForm({quantity, material, id , unit}: OrderMaterialItemDTO) {
    
    return(
        <Grid>
            item
        </Grid>
    )
}

export default memo(ItemControlForm);