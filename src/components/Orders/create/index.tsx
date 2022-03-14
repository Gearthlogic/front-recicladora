import moment from "moment";
import DesktopDatePicker from '@mui/lab/DatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { useDispatch } from "react-redux";
import { memo, useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { LocalizationProvider } from "@mui/lab";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import {
    Button,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    TextField,
    Typography
} from "@mui/material";

import { createNewOrder, getAvailableClientsList } from "../../../services/api/clients";
import { endLoading, startLoading } from "../../../redux/actions/loading/loading";
import { setMessage } from "../../../redux/actions/message";

interface OrderFormData {
    clientId: number;
    pickupDate: string | Date;
}

const schema = yup
    .object({
        clientId: yup.number().min(1).required("Seleccione un Alias"),
        pickupDate: yup.date().required("La fecha es requerida."),
    }).required();

const paperStyle = {
    padding: 30,
    minHeight: 400,
    width: '25%',
};

const btnstyle = {
    margin: "30px 0"
};

const OrdersHistory = () => {
    const dispatch = useDispatch()

    const [clientsList, setClientsList] = useState([])

    useEffect(() => {
        getAvailableClientsList().then(res => setClientsList(res.data))
    }, [])

    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<OrderFormData>({
        resolver: yupResolver(schema),
    });

    const onSubmit: SubmitHandler<OrderFormData> = async data => {
        dispatch(startLoading())

        const newBody = {
            ...data,
            pickupDate: moment(data.pickupDate).format("YYYY-MM-DD")
        }
        
        try {
            await createNewOrder(newBody);
            dispatch(setMessage({ action: 'Orden creada exitosamente.' }))
        } catch (error: any) {
            dispatch(setMessage({ action: 'ERROR al crear orden.' }, 'error'))
        } finally {
            dispatch(endLoading())
        }
    };

    return (
        <Grid
            container
            alignItems="center"
            justifyContent="center"
        >
            <Paper elevation={10} style={paperStyle} >
                <Typography align="center" variant="h4" margin={5} width={'auto'}>
                    Crear orden
                </Typography>

                <form onSubmit={handleSubmit(onSubmit)} >
                    <Grid container flexDirection="column">
                        <FormControl variant='standard' sx={{ my: 2, minWidth: 250 }}>
                            <InputLabel id='clientId'>
                                Alias de Cliente
                            </InputLabel>

                            <Controller
                                name='clientId'
                                control={control}
                                defaultValue={0}
                                render={({ field }) => {
                                    return (
                                        <Select
                                            fullWidth
                                            labelId='clientId'
                                            id='clientId'
                                            {...field}
                                        >
                                            {clientsList.map((client: any) => (
                                                <MenuItem value={client.id} key={client.id}>
                                                    {client.alias}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    )
                                }}
                            />
                            {errors.clientId && (
                                <Typography
                                    variant='subtitle2'
                                    style={{ color: 'red' }} >
                                    {errors.clientId.type === 'min' ?
                                        'Seleccione un Alias'
                                        : errors.clientId.message
                                    }
                                </Typography>
                            )}
                        </FormControl>

                        <Controller
                            control={control}
                            name="pickupDate"
                            render={({ field }) => (
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DesktopDatePicker
                                        {...field}
                                        minDate={new Date()}
                                        label="Fecha de retiro"
                                        renderInput={(params) => (
                                            <TextField
                                                sx={{ my: 2 }}
                                                variant="standard"
                                                {...params} />
                                        )}
                                    />
                                </LocalizationProvider>
                            )}
                        />
                        <Button
                            type="submit"
                            color="primary"
                            variant="contained"
                            style={btnstyle}
                            fullWidth
                        >
                            Crear Orden
                        </Button>
                    </Grid>
                </form>
            </Paper>
        </Grid>
    )
}

export default memo(OrdersHistory);