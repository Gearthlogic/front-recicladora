import { memo, useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import {
    Button,
    FormControl,
    MenuItem,
    Select,
    Typography
} from "@mui/material";

import { createNewOrder, getAvailableClientsList } from "../../../../../services/api/clients";
import { OrderState } from "../../../../../constants/enums/orderStates.enum";
import { GetCurrentOrderDTO } from "../../../../../constants/dto/order.dto";
import { useGlobalLoader } from "../../../../../hooks/UseGlobalLoader";

interface OrderFormData {
    clientId: number;
}

const schema = yup
    .object({
        clientId: yup.number().min(1).required("Seleccione un Alias"),
    }).required();

interface CreateOrderProps {
    setOrders: React.Dispatch<React.SetStateAction<GetCurrentOrderDTO[] | undefined>>
}

const CreateOrder = ({ setOrders }: CreateOrderProps) => {
    const [clientsList, setClientsList] = useState<{ id: number, alias: string }[]>([])

    useEffect(() => {
        getAvailableClientsList().then(res => setClientsList(res.data))
    }, [])

    const { handleSubmit, control, formState: { errors }, } = useForm<OrderFormData>({
        resolver: yupResolver(schema),
    });

    const onSubmit = useGlobalLoader(async (dispatch, values) => {
        const { data } = await createNewOrder(values);

        const newOrder = {
            id: data.id as number,
            client: data.client,
            items: [],
            state: data.state as OrderState
        }

        setOrders(prev => prev?.concat(newOrder))
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)} >
            <FormControl variant='standard' sx={{ minWidth: 100 }}>
                {clientsList.length > 0 && (
                    <Controller
                        name='clientId'
                        control={control}
                        defaultValue={clientsList[0]?.id }
                        render={({ field }) => {
                            return (
                                <Select
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
                )}
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

            <Button type="submit" color="primary"    >
                Crear Orden
            </Button>
        </form >
    )
}

export default memo(CreateOrder);

