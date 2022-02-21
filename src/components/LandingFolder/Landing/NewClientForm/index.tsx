import { Button, FormControl, Grid, InputLabel, MenuItem, Paper, Select, TextField, Typography } from "@mui/material";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { createNewClient } from "../../../../services/api/createNewClient";
import { RootStateOrAny, useSelector } from "react-redux";

export enum ClientType {
    permanent = 'permanent',
    temporary = 'temporary'
}


interface FormData {
    alias: string;
    firstname: string;
    lastname: string;
    email: string;
    cellphone: string;
    type: ClientType;
}

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const schema = yup
    .object({
        alias: yup.string().required("Debe ingresar un Alias").min(3, 'Minimo valido 3 caracteres').max(25, 'Maximo valido 25 caracteres'),
        firstname: yup.string().required("Debe ingresar un Nombre").min(3, 'Minimo valido 3 caracteres').max(25, 'Maximo valido 25 caracteres'),
        lastname: yup.string().required("Debe ingresar un Apellido").min(3, 'Minimo valido 3 caracteres').max(25, 'Maximo valido 25 caracteres'),
        email: yup.string().email("Debe ser un email valido").required("Debe ingresar un Email"),
        cellphone: yup.string().matches(phoneRegExp, "Numero de telefono no valido").required("Debe ingresar un telefono"),
        type: yup.string().required("Debe ingresar un Tipo de Cliente")
    })
    .required();

const NewClientForm = () => {

    /*     const { user } = useSelector((state: RootStateOrAny) => state.auth)
        console.log(user) */

    const paperStyle = {
        padding: 30,
        height: '60%',
        width: '20%',
    };
    const btnstyle = { margin: "30px 0" };

    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<FormData>({
        resolver: yupResolver(schema),
    });
    const onSubmit: SubmitHandler<FormData> = (data) => {
        console.log(data)
        createNewClient(data)
            .then(res => console.log(res))
            .catch(err => console.log(err))
    };

    return (
        <Grid
            container
            alignItems="center"
            justifyContent="center"
            style={{ minHeight: "100vh" }}
        >
            <Paper elevation={10} style={paperStyle}>
                <Typography align="center" variant="h4" margin={4}>
                    Alta de Cliente
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Controller
                        name="alias"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                label="Alias"
                                placeholder="Ingrese Alias de Cliente"
                                fullWidth
                                margin="normal"
                                {...field}
                                variant="standard"
                            />
                        )}
                    />
                    {errors.alias && (
                        <Typography variant="subtitle2" style={{ color: "red" }}>
                            {errors.alias.message}
                        </Typography>
                    )}
                    <Controller
                        name="firstname"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                label="Nombre"
                                placeholder="Ingrese Nombre de Cliente"
                                fullWidth
                                margin="normal"
                                {...field}
                                variant="standard"
                            />
                        )}
                    />
                    {errors.firstname && (
                        <Typography variant="subtitle2" style={{ color: "red" }}>
                            {errors.firstname.message}
                        </Typography>
                    )}
                    <Controller
                        name="lastname"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                label="Apellido"
                                placeholder="Ingrese Apellido de Cliente"
                                fullWidth
                                margin="normal"
                                {...field}
                                variant="standard"
                            />
                        )}
                    />
                    {errors.lastname && (
                        <Typography variant="subtitle2" style={{ color: "red" }}>
                            {errors.lastname.message}
                        </Typography>
                    )}
                    <Controller
                        name="email"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                label="Email"
                                placeholder="Ingrese Email de Cliente"
                                fullWidth
                                margin="normal"
                                {...field}
                                variant="standard"
                            />
                        )}
                    />
                    {errors.email && (
                        <Typography variant="subtitle2" style={{ color: "red" }}>
                            {errors.email.message}
                        </Typography>
                    )}
                    <Controller
                        name="cellphone"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                label="Telefono"
                                placeholder="Ingrese Telefono de Cliente"
                                fullWidth
                                margin="normal"
                                {...field}
                                variant="standard"
                            />
                        )}
                    />
                    {errors.cellphone && (
                        <Typography variant="subtitle2" style={{ color: "red" }}>
                            {errors.cellphone.message}
                        </Typography>
                    )}
                    <FormControl variant="standard" sx={{ mt: 2, minWidth: 150 }}>
                        <InputLabel id="demo-simple-select-standard-label">Tipo de Cliente</InputLabel>
                        <Controller
                            name="type"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    labelId="demo-simple-select-standard-label"
                                    id="demo-simple-select-standard"
                                    label="Tipo de Cliente"
                                    {...field}
                                >
                                    <MenuItem value={''}>Tipo de Cliente</MenuItem>
                                    <MenuItem value={ClientType.permanent}>Permantente</MenuItem>
                                    <MenuItem value={ClientType.temporary}>Temporal</MenuItem>
                                </Select>
                            )}
                        />
                        {errors.type && (
                            <Typography variant="subtitle2" style={{ color: "red" }}>
                                {errors.type.message}
                            </Typography>
                        )}
                    </FormControl>

                    <Button
                        type="submit"
                        color="primary"
                        variant="contained"
                        style={btnstyle}
                        fullWidth
                    >
                        Guardar
                    </Button>
                </form>

            </Paper>
        </Grid>
    );
};

export default NewClientForm;
