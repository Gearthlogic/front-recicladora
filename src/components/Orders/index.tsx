import { SyntheticEvent, useMemo, useState } from "react";
import { Box, Tab, Grid, Badge, Button } from "@material-ui/core";
import TabList from '@mui/lab/TabList';
import TabContext from '@mui/lab/TabContext';

import OrderList from './components/orderList';
import CreatedOrderListHeader from "./components/createdOrderListHeader";
import { getCurrentOrders } from '../../services/api/orders';
import { OrderState } from "../../constants/enums/orderStates.enum";
import { GetCurrentOrderDTO } from "../../constants/dto/order.dto";
import useFetch from "../../hooks/useFetch";

function CurrentOrders() {
    const [value, setValue] = useState<OrderState>(OrderState.Created);

    const handleChange = (event: SyntheticEvent, newValue: string) => {
        setValue(newValue as OrderState);
    };

    const { data, setData, fetchCallback } = useFetch<GetCurrentOrderDTO[]>(
        useMemo(() => getCurrentOrders(), [])
    );

    const ordersMap = useMemo(() => {
        const ordersMap: { [key in OrderState]?: GetCurrentOrderDTO[] } = {};

        Object.values(OrderState).forEach(state => {
            ordersMap[state] = data?.filter(order => order.state === state)
        });

        return ordersMap;
    }, [data]);


    function createTabLabel(label: string, state: OrderState) {
        const count = ordersMap[state]?.length || 0;
        const active = value === state;

        return <div>
            <span style={{ marginRight: 10 }}> {label} </span>
            <Badge
                color={active ? "primary" : undefined}
                badgeContent={<span>{count}</span>}
            />
        </div>
    }

    return (
        <TabContext value={value}>
            <Grid container flexDirection="column">
                <Box sx={{ borderBottom: 1, borderColor: 'divider', paddingBottom: 2, marginBottom: 2 }} >
                    <Grid
                        container
                        justifyContent="space-between"
                        flexDirection="row"
                    >
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
                        </TabList>
                        <Button onClick={fetchCallback} > Recargar ordenes </Button>
                    </Grid>
                </Box>
                <Grid container item>
                    {value === OrderState.Created &&
                        <CreatedOrderListHeader setOrders={setData} />
                    }
                    <OrderList orders={ordersMap[value]} setOrders={setData} />
                </Grid>
            </Grid >
        </TabContext>
    )
}

export default CurrentOrders;