import {
  Accordion,
  AccordionSummary,
  Button,
  Grid,
  Paper,
  Typography,
} from "@material-ui/core";
import { AccordionDetails } from "@mui/material";
import { useCallback, useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import Items from "./components/items";
import useFetch from "../../../hooks/useFetch";
import { getControllingOrders } from "../../../services/api/orders";
import ConfirmationModal from "./components/ConfirmationModal";

const paperStyles = {
  minHeight: "85vh",
  padding: 10,
  width: "90%",
};

function ControllingOrderList() {
  const [selectedId, setSelectedId] = useState<number>();
  const { data, setData, fetchCallback } = useFetch<any[]>(
    useCallback(() => getControllingOrders(), [])
  );


  return (
    <Grid container justifyContent="center">

      <ConfirmationModal
        id={selectedId}
        setData={setData}
        onClose={useCallback(() => setSelectedId(undefined), [])}
      />
      <Paper style={paperStyles}>
        <Typography textAlign="center" variant="h4">
          Ordenes por controlar
        </Typography>
        <Grid justifyContent="center" marginY={2} container>
          <Button variant="contained" onClick={fetchCallback}>
            Recargar
          </Button>
        </Grid>
        {(data?.length || 0) > 0 ? (
          data?.map((order) => (
            <Accordion key={order.id}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6">
                  #{order.id} - {order.client.alias}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Items
                  setData={setData}
                  items={order.items}
                  id={ order.id}
                  setSelectedId={ setSelectedId}
                />
              </AccordionDetails>
            </Accordion>
          ))
        ) : (
          <Typography textAlign="center">
            No hay ordenes por controlar
          </Typography>
        )}
      </Paper>
    </Grid>
  );
}

export default ControllingOrderList;
