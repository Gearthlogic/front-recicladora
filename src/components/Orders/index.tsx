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
    const [port, setPort] = useState<SerialPort>();

    const history = useHistory();

    const handleChange = (event: SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    async function connectDevice() {
        const port = await navigator.serial.requestPort();

        setPort(port);
    }

    async function ReadFromSerial2() {
        if (port) {
            await port.open({ baudRate: 2400 });
            console.log("PUERTO ABIERTO")
            let finalValue = '';
            let count = 1;
            let keepReading = true

            while (port.readable && keepReading) {
                console.log("ENTRANDO EN EL LOOP EXTERNO")

                const textDecoder = new TextDecoderStream("utf-8");
                const readableStreamClosed = port.readable.pipeTo(textDecoder.writable);
                const reader = textDecoder.readable.getReader();

                try {
                    while (true) {
                        console.log("PASADA", count)
                        const { value, done } = await reader.read();
                        console.log("VALOR", value);
                        console.log("FINALIZADO", done);

                        if (done) {
                            reader.releaseLock();
                            break;
                        }

                        finalValue += value;
                        count++;

                        console.log("VALOR CONCATENADO ", finalValue);

                        const hasEndLine = finalValue.includes('\r\n')
                        const limit = count === 100;

                        console.log("TIENE SALTO ", hasEndLine);
                        console.log("LLEGO AL LIMITE ", limit);

                        if (hasEndLine || limit ) {
                            console.log("CANDELANDO EL LECTOR");
                            keepReading = false;

                            reader.cancel();
                        }

                        console.log("SALIENDO DEL LOOP INTERNO")
                    }

                } catch (error) {
                    console.error(error)
                } finally {
                    console.log("SALIENDO DEL LOOP EXTERNO")
                    await readableStreamClosed.catch(console.error);
                }
            }

            console.log("CERRANDO PUERTO")
            console.log("Readable", port.readable)
            console.log("Writable", port.writable)

            await port.close();
            console.log("PUERTO CERRADO")
        }
    }

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
                        <div>
                            {!port ?
                                <Button
                                    style={{ marginRight: 2 }}
                                    onClick={connectDevice}
                                    variant="contained"
                                    color="success"
                                >
                                    Conectar
                                </Button>
                                :
                                <Button
                                    style={{ marginRight: 2 }}
                                    onClick={ReadFromSerial2}
                                    variant="contained"
                                    color="success"
                                >
                                    Pesar
                                </Button>
                            }
                            <Button
                                onClick={() => history.push(Path.createOrder)}
                                variant="contained" >
                                Crear orden
                            </Button>
                        </div>
                    </Grid>
                </Box>
                <Grid container item>
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