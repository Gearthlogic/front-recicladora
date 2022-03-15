import { Grid, Paper, Typography } from "@mui/material";
import { useExtractQueryParamData } from "../../../hooks/useQueryParamData";

import PasswordForm from './components/passwordForm';
import RolesForm from './components/rolesEditForm';

const paperStyle = {
    padding: 30,
    margin: 10,
    width: 300,
};

const EditUser = () => {
    const data = useExtractQueryParamData();
    
    return (
        <Grid container alignItems="center" justifyContent="center">
            <Paper elevation={10} style={paperStyle}>
                <Typography align="center" variant="h4" margin={2}>
                    Editar usuario : {data.username}
                </Typography>
                <PasswordForm id={data.id} />
                <RolesForm id={data.id} roles={data.roles} />
            </Paper>
        </Grid >
    );
};

export default EditUser;
