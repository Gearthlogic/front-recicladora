import { SyntheticEvent, useState } from "react";
import { Box, Tab, Grid, Button } from "@material-ui/core";
import TabPanel from '@mui/lab/TabPanel';
import TabList from '@mui/lab/TabList';
import TabContext from '@mui/lab/TabContext';

import OrderHistory from './components/history';
import CurrentOrders from './components/current';
import { useHistory } from "react-router-dom";
import { Path } from "../../constants/enums/path.enum";

function OrderList() {
    const [value, setValue] = useState('1');
    const history = useHistory();

    const handleChange = (event: SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    return (
        <TabContext value={value}>
            <Grid container flexDirection="column">
                <Box
                    sx={{
                        borderBottom: 1,
                        borderColor: 'divider',
                        paddingBottom: 2
                    }}
                >
                    <Grid container justifyContent="space-between" flexDirection="row" item>
                        <TabList onChange={handleChange} aria-label="tabs de ordenes">
                            <Tab label="En curso" value="1" />
                            <Tab label="Historial" value="2" />
                        </TabList>
                        <Button
                            onClick={() => history.push(Path.createOrder)}
                            variant="contained" >
                            Crear orden
                        </Button>
                    </Grid>
                </Box>
                <Grid container item>
                    <TabPanel  value="1">
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