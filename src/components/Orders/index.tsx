import { SyntheticEvent, useState } from "react";
import { Box, Tab, Grid } from "@material-ui/core";
import TabPanel from '@mui/lab/TabPanel';
import TabList from '@mui/lab/TabList';
import TabContext from '@mui/lab/TabContext';

import OrderHistory from './history';
import CurrentOrders from './current';

function OrderList() {
    const [value, setValue] = useState('1');

    const handleChange = (event: SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    return (
        <TabContext value={value}>
            <Grid padding={5} container flexDirection="column">
                <Grid container flexDirection="row" item>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChange} aria-label="tabs de ordenes">
                            <Tab label="En curso" value="1" />
                            <Tab label="Historial" value="2" />
                        </TabList>
                    </Box>
                </Grid>
                <Grid container  item>
                    <TabPanel value="1">
                        <CurrentOrders />
                    </TabPanel>
                    <TabPanel value="2">
                        <OrderHistory />
                    </TabPanel>
                </Grid>
            </Grid >
        </TabContext>
    )
}

export default OrderList;