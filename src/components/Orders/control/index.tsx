import { Accordion, AccordionSummary, Grid, Paper, Typography } from "@material-ui/core";
import { AccordionDetails } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import Items from './components/items'
import useFetch from "../../../hooks/useFetch";
import { getControllingOrders } from "../../../services/api/orders";
import { useMemo } from "react";

const paperStyles = {
    minHeight: '85vh',
    padding: 10,
    width: '60%'
}

function ControllingOrderList() {
    const { data } = useFetch<any[]>(useMemo(() => getControllingOrders(), []))

    return (
        <Grid container justifyContent="center">
            <Paper style={paperStyles}>
                <Typography textAlign="center" variant="h4"  >
                    Ordenes por controlar
                </Typography>
                {(data?.length || 0) > 0 ?
                    data?.map(order => (
                        <Accordion key={order.id}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography variant="h6"  >
                                    #{order.id} - {order.client.alias}
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Items items={order.items} />
                            </AccordionDetails>
                        </Accordion>
                    )) : <Typography textAlign="center"   >
                        No hay ordenes por controlar
                    </Typography>
                }
            </Paper>
        </Grid >
    )
}


export default ControllingOrderList;