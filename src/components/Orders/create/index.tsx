import { yupResolver } from "@hookform/resolvers/yup";
import { LocalizationProvider } from "@mui/lab";
import DesktopDatePicker from '@mui/lab/DatePicker';
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Paper, Select, Typography } from "@mui/material";
import { memo, useEffect, useState } from "react";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { createNewOrder, getAvailableClientsList } from "../../../services/api/clients";
import { useDispatch } from "react-redux";
import { endLoading, startLoading } from "../../../redux/actions/loading/loading";
import { setMessage } from "../../../redux/actions/message";


interface OrderFormData {
    clientId: number;
    pickupDate: string | Date;
    tomorrow: string | Date;
}
interface DateFormat {
    year: any;
    month: any;
    day: any;
}

const schema = yup
    .object({
        clientId: yup.number().min(1).required("Seleccione un Alias"),
        // pickupDate: yup.string().required("La fecha es requerida."),
    }).required();

const paperStyle = {
    padding: 30,
    height: "auto",
    width: 'auto',
};

const btnstyle = {
    margin: "30px 0"
};

const OrdersHistory = () => {
    const dispatch = useDispatch()

    const [clientsList, setClientsList] = useState([])
    const [pickupDate, setPickupDate] = useState<Date | null>(new Date());

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

        const { year, month, day }: DateFormat = {
            year: pickupDate?.getFullYear(),
            month: pickupDate?.getMonth(),
            day: pickupDate?.getDate(),
        }
        const dateToSend = `${year}-${month <= 9 ? '0' : ''}${month + 1}-${day <= 9 ? '0' : ''}${day}`
        const newBody = { ...data, pickupDate: dateToSend }

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
            style={{ display: 'flex', flexDirection: 'column', justifyContent: 'start' }}
        >
            <Paper elevation={10} style={{ ...paperStyle, display: 'flex', flexDirection: 'column', justifyContent: 'center' }} >
                <Typography align="center" variant="h4" margin={5} width={'auto'}>
                    Crear Nueva Orden
                </Typography>

                <form onSubmit={handleSubmit(onSubmit)} >
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 'auto' }}>
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
                                            label='Tipo de Cliente'
                                            {...field}
                                        >
                                            {clientsList.map((client: any, i) => (
                                                <MenuItem value={client.id} key={i}>
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
                                    style={{ color: 'red' }}
                                >{errors.clientId.type === 'min' ?
                                    'Seleccione un Alias'
                                    :
                                    errors.clientId.message}
                                </Typography>
                            )}
                        </FormControl>

                        <section style={{ margin: '20px 0px', scale: '1.15' }}>
                            <label>Fecha de la Orden</label>
                            <Controller
                                control={control}
                                name="pickupDate"
                                render={({ field }) => (
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <DesktopDatePicker
                                            {...field}
                                            label="Custom input"
                                            // TODO Set default value as 'tomorrow' date.
                                            value={pickupDate}
                                            onChange={(newValue) => {
                                                setPickupDate(newValue);
                                            }}
                                            renderInput={({ inputRef, inputProps, InputProps }) => (
                                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                    <input ref={inputRef} {...inputProps} />
                                                    {InputProps?.endAdornment}
                                                </Box>
                                            )}
                                        />
                                    </LocalizationProvider>
                                )}
                            />
                        </section>
                    </div>
                    <Button
                        type="submit"
                        color="primary"
                        variant="contained"
                        style={btnstyle}
                        fullWidth
                    >
                        Crear Orden
                    </Button>
                </form>
            </Paper>
        </Grid>
    )
}

export default memo(OrdersHistory);