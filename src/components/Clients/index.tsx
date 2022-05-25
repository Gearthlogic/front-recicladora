import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { useHistory } from "react-router-dom";

import { getClients } from '../../services/api/clients';
import ClientsTable from "./components/ClientsTable"
import { Path } from "../../constants/enums/path.enum";
import { Grid } from "@material-ui/core";


const ClientList = () => {
    const [data, setData] = useState([])
    const history = useHistory();

    useEffect(() => {
        getClients().then(res => setData(res.data))
    }, [])

    return (
        <Grid container>
            <Grid
                container
                direction="row"
                justifyContent="flex-end"
            >
                <Button
                    variant="contained" color="primary"
                    onClick={() => history.push(Path.createClient)}>
                    Crear cliente
                </Button>
            </Grid>
            <Grid item xs={12} >
                <ClientsTable rows={data} />
            </Grid>
        </Grid>
    )
}

export default ClientList