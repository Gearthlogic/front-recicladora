import { Grid } from "@material-ui/core"
import { useMemo, memo } from "react";
import { ClientType } from "../../../constants/enums/client.enum";

import useFetch from "../../../hooks/useFetch";
import { useExtractQueryParamData } from "../../../hooks/useQueryParamData"
import { getOrderItems } from "../../../services/api/orders";
import CreateItemsForm from './components/CreateItemsForm';

interface CurrentOrder {
  alias: string,
  state: string,
  id: number,
  address: string,
  type: ClientType,
}

const Order = () => {
  const data = useExtractQueryParamData();

  const { data: items } = useFetch<CurrentOrder[]>(
    useMemo(() =>  getOrderItems(data.orderId), [data.orderId])
  );

  console.log(data.orderId)
  return (
    <Grid container>
      {items?.length === 0 &&
        <CreateItemsForm type={data.type} id={data.orderId} />
      }
    </Grid>
  )
}

export default memo(Order)