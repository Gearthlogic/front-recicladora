import { Grid, Button } from "@material-ui/core";
import { Dispatch, memo, SetStateAction } from "react";
import { useDispatch } from "react-redux";

import { ControlOrderItemDTO } from "../../../../../constants/dto/order.dto";
import {
  endLoading,
  startLoading,
} from "../../../../../redux/actions/loading/loading";
import { setMessage } from "../../../../../redux/actions/message";
import { endControlling } from "../../../../../services/api/orders";
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
