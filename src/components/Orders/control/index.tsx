import moment from "moment";
import { Accordion, AccordionSummary, Grid, Paper, Typography } from "@material-ui/core";
import { AccordionDetails } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import Items from './components/items'
import useFetch from "../../../hooks/useFetch";
import { OrderState } from "../../../constants/enums/orderStates.enum";
import { getOrders } from "../../../services/api/orders";

const paperStyles = {
    minHeight : '85vh',
    padding: 10,
    width: '60%'
}
const orderRequest = getOrders({ 
    pickupDate: moment().format("YYYY-MM-DD"),
    state: [OrderState.Controlling]
});

function ControllingOrderList() {
    const { data } = useFetch<{ orders: any[] }>( orderRequest )
    
    return (
        <Grid container  justifyContent="center">
            <Paper style={paperStyles}>
                <Typography textAlign="center" variant="h4"  >
                    Ordenes por controlar
                </Typography>
                {(data?.orders?.length || 0 )> 0 ?
                    data?.orders.map(order => (
                        <Accordion key={order.orderId}>
                            <AccordionSummary           
                            expandIcon={<ExpandMoreIcon />}>
                                {order.client.alias}
                            </AccordionSummary>
                            <AccordionDetails>
                                <Items />
                            </AccordionDetails>
                        </Accordion>
                    )) : <Typography textAlign="center"   >
                       No hay ordenes por controlar
                    </Typography>
                }
            </Paper>
        </Grid>
    )
}


export default ControllingOrderList;