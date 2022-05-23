import { SyntheticEvent, useEffect, useMemo, useState } from "react";
import { Box, Tab, Grid, Badge, Button } from "@material-ui/core";
import TabList from "@mui/lab/TabList";
import TabContext from "@mui/lab/TabContext";

import OrderList from "./components/orderList";
import CreatedOrderListHeader from "./components/createdOrderListHeader";
import { getCurrentOrders } from "../../services/api/orders";
import { OrderState } from "../../constants/enums/orderStates.enum";
import { GetCurrentOrderDTO } from "../../constants/dto/order.dto";
import { useSerialPort } from "../../hooks/useSerialPort";
import ClientPaymentModal, {
  PaymentFetchDetails,
} from "../common/Modal/ClientPaymentModal";
import { useGlobalLoader } from "../../hooks/UseGlobalLoader";

function CurrentOrders() {
  const [currentTab, setCurrentTab] = useState<OrderState>(OrderState.Created);
  const [paymentfetchDetails, setPaymentFetchDetails] =
    useState<PaymentFetchDetails>();
  const [data, setData] = useState<GetCurrentOrderDTO[]>([]);

  const { readFromSerial, requestPort } = useSerialPort();

  const handleChange = (event: SyntheticEvent, newCurrentTab: string) => {
    setCurrentTab(newCurrentTab as OrderState);
  };

  const fetchCallback = useGlobalLoader(async () => {
    const res = await getCurrentOrders();
    setData(res.data);
  });

  useEffect(() => {
    fetchCallback();
  }, []);

  const ordersMap = useMemo(() => {
    const ordersMap: { [key in OrderState]?: GetCurrentOrderDTO[] } = {};

    Object.values(OrderState).forEach((state) => {
      ordersMap[state] = data?.filter((order) => order.state === state);
    });

    return ordersMap;
  }, [data]);

  function createTabLabel(label: string, state: OrderState) {
    const count = ordersMap[state]?.length || 0;
    const active = currentTab === state;

    return (
      <div>
        <span style={{ marginRight: 10 }}> {label} </span>
        <Badge
          color={active ? "primary" : undefined}
          badgeContent={<span>{count}</span>}
        />
      </div>
    );
  }

  return (
    <Grid container flexDirection="column">
      <ClientPaymentModal
        fetchDetails={paymentfetchDetails}
        onClose={() => {
          setPaymentFetchDetails(undefined);
        }}
        filterOrder={() => {
          setData((prev) =>
            prev?.filter(
              (order) => order.client.account.accountId !== paymentfetchDetails?.id
            )
          );
        }}
      />
      <TabContext value={currentTab}>
        <Box
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            paddingBottom: 2,
            marginBottom: 2,
          }}
        >
          <Grid container justifyContent="space-between" flexDirection="row">
            <TabList onChange={handleChange} aria-label="tabs de ordenes">
              <Tab
                label={createTabLabel("Creadas", OrderState.Created)}
                value={OrderState.Created}
              />
              <Tab
                label={createTabLabel("Controlando", OrderState.Controlling)}
                value={OrderState.Controlling}
              />
              <Tab
                label={createTabLabel("Cerradas", OrderState.Closed)}
                value={OrderState.Closed}
              />
              <Tab
                label={createTabLabel("Pagadas", OrderState.Payed)}
                value={OrderState.Payed}
              />
            </TabList>
            <Button onClick={fetchCallback}> Recargar ordenes </Button>
          </Grid>
        </Box>
        <Grid container item>
          <CreatedOrderListHeader
            currentTab={currentTab}
            requestPort={requestPort}
            setOrders={setData}
          />
          <OrderList
            readFromSerial={readFromSerial}
            orders={ordersMap[currentTab]}
            setOrders={setData}
            setPaymentFetchDetails={setPaymentFetchDetails}
          />
        </Grid>
      </TabContext>
    </Grid>
  );
}

export default CurrentOrders;
