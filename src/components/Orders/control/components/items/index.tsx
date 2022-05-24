import { Grid, Button } from "@material-ui/core";
import { Dispatch, memo, SetStateAction } from "react";

import { ControlOrderItemDTO } from "../../../../../constants/dto/order.dto";
import Item from "./item";

interface ControlOrderItemsFormProps {
  items: ControlOrderItemDTO[];
  setData: Dispatch<SetStateAction<any[] | undefined>>;
  setSelectedId: Dispatch<SetStateAction<number | undefined>>;
  id: number;
}

const ControlOrderItemsForm = ({
  items,
  setSelectedId,
  id,
}: ControlOrderItemsFormProps) => {
  return (
    <Grid container>
      {items.map((item) => (
        <Item key={item.id} {...item} />
      ))}
      <Grid marginY={4} container justifyContent="center">
        <Button variant="contained" onClick={() => setSelectedId(id)}>
          Terminar control
        </Button>
      </Grid>
    </Grid>
  );
};

export default memo(ControlOrderItemsForm);
