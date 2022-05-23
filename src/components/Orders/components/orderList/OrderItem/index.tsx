import { Button, Divider, Grid, Paper, Typography } from "@material-ui/core";
import { memo, ReactElement, Dispatch, SetStateAction } from "react";

import { GetCurrentOrderDTO } from "../../../../../constants/dto/order.dto";
import { OrderState } from "../../../../../constants/enums/orderStates.enum";
import CreateItemsForm from "./components/CreateItemsForm";
import OrderItemList from "../../../../common/Orders/OrderSummary";
import { PaymentFetchDetails } from "../../../../common/Modal/ClientPaymentModal";

interface OrderItemProps {
  item: GetCurrentOrderDTO;
  setOrders: Dispatch<SetStateAction<GetCurrentOrderDTO[]>>;
  readFromSerial: Function;
  setPaymentFetchDetails: Dispatch<
    SetStateAction<PaymentFetchDetails | undefined>
  >;
}

function OrderItem({
  item,
  setOrders,
  readFromSerial,
  setPaymentFetchDetails,
}: OrderItemProps) {
  const {
    id,
    state,
    client: { type, alias, account },
    items,
    payableAmount,
    transactionId,
  } = item;

  function orderItemsComponentFactory() {
    const stateComponentMap: { [key in OrderState]?: ReactElement } = {
      [OrderState.Created]: (
        <CreateItemsForm
          readFromSerial={readFromSerial}
          setOrders={setOrders}
          id={id}
          type={type}
        />
      ),
      [OrderState.Controlling]: <OrderItemList items={items} />,
      [OrderState.Closed]: (
        <OrderItemList total={payableAmount} items={items} />
      ),
      [OrderState.Payed]: <OrderItemList total={payableAmount} items={items} />,
    };

    return stateComponentMap[state];
  }

  return (
    <Paper style={{ width: "100%", margin: "10px 0", padding: 10 }}>
      <Grid container flexDirection="row">
        <Grid item flexDirection="column" sm={2}>
          <Grid marginBottom={2}>
            <Typography> Orden N°{id} </Typography>
            <Typography> Cliente: {alias} </Typography>
          </Grid>

          {item.state === OrderState.Closed && (
            <Button
              variant="contained"
              color="secondary"
              onClick={() =>
                setPaymentFetchDetails({
                  type: "account",
                  id: account.accountId,
                })
              }
            >
              Pagar
            </Button>
          )}
          {item.state === OrderState.Payed && (
            <Button
              variant="contained"
              color="secondary"
              onClick={() =>
                setPaymentFetchDetails({
                  type: "transaction",
                  id: transactionId,
                })
              }
            >
              Ver pago
            </Button>
          )}
        </Grid>
        <Divider orientation="vertical" flexItem />
        <Grid marginLeft={2} item flexDirection="column" sm={8}>
          {orderItemsComponentFactory()}
        </Grid>
      </Grid>
    </Paper>
  );
}

export default memo(OrderItem);
