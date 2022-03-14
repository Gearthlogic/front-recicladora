import { Typography } from "@material-ui/core";
import { Button, Grid, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useExtractQueryParamData } from "../../hooks/useQueryParamData";
import { endLoading, startLoading } from "../../redux/actions/loading/loading";
import { getAccount, postCurrentAccountTransaction } from "../../services/api/account";
import CustomModal from "../common/Modal/CustomModal";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { setMessage } from "../../redux/actions/message";

interface TransactionFormData {
    accountId?: number;
    amount: number;
    details?: string;
}

const schema = yup
    .object({
        amount: yup
            .number()
            .typeError('Ingrese números solamente, por favor.')
            .required("Ingrese un monto"),
        details: yup
            .string()
            .min(5, 'La descripción es demaciado corta.')
            .max(140, 'La descripción es demaciado larga.')
    }).required();

const ClientAccount = () => {
    const dispatch = useDispatch();

    const [account, setAccount] = useState<any>()
    const [showModal, setShowModal] = useState<boolean>(false)
    const data = useExtractQueryParamData();

    useEffect(() => {
        dispatch(startLoading());
        getAccount(data.id).then((response: any) => {
            setAccount({
                accountId: response[0].accountId,
                balance: response[0].balance,
                transactions: response[0].transactions
            })
        })
            .catch(console.log)
            .finally(() => dispatch(endLoading()));
    }, [data.id, dispatch])

    const { reset, handleSubmit, control, formState: { errors } } = useForm<TransactionFormData>({
        resolver: yupResolver(schema),
    });

    const handleShowModal = () => {
        setShowModal(!showModal)
        reset({
            amount: 0,
            details: ''
        })
    }

    const onSubmit: SubmitHandler<TransactionFormData> = async (data) => {
        dispatch(startLoading())

        const toSend = { ...data, accountId: account.accountId }

        try {
            await postCurrentAccountTransaction(toSend)
            dispatch(setMessage({ action: "Operación Exitosa" }))
        } catch (error) {
            dispatch(setMessage({ action: "ERROR - Operación incorrecta" }, 'error'))
        } finally {
            dispatch(endLoading())
            handleShowModal()
        }
    };

    return (
        <Grid
            container
        >
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                <div style={{ display: 'flex' }}>
                    <div style={{ display: 'flex', margin: '5px' }}>
                        <Typography variant="h5">
                            <span style={{ opacity: .5 }}>{`Alias: `}</span>{`${data?.alias}`}
                        </Typography>
                    </div>

                    <div style={{ display: 'flex', margin: '5px 25px' }}>
                        <Typography variant="h5">
                            <span style={{ opacity: .5 }}>{`Balance: `}</span>{`${account?.balance}`}
                        </Typography>
                    </div>
                </div>

                <Button
                    variant='contained'
                    onClick={handleShowModal}
                >
                    Crear Transacción
                </Button>
            </div>

            <CustomModal
                open={showModal}
                onClose={handleShowModal}
            >
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-Start',
                    alignItems: 'center',
                    width: '50vw',
                    height: '50vh',
                }}>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        style={{ margin: '20px' }}
                    >
                        <Controller
                            name="amount"
                            control={control}
                            defaultValue={0}
                            render={({ field }) => (
                                <TextField
                                    label="Monto de la transación"
                                    placeholder="Ingrese Monto"
                                    type="number"
                                    fullWidth
                                    margin="normal"
                                    {...field}
                                />
                            )}
                        />
                        {errors.amount && (
                            <Typography variant="subtitle2" style={{ color: "red" }}>
                                {errors.amount.message}
                            </Typography>
                        )}

                        <Controller
                            name="details"
                            control={control}
                            defaultValue=''
                            render={({ field }) => (
                                <TextField
                                    label="Detalle de la Transacción"
                                    placeholder="Descripción"
                                    type="text"
                                    fullWidth
                                    margin="normal"
                                    {...field}
                                />
                            )}
                        />
                        {errors.details && (
                            <Typography variant="subtitle2" style={{ color: "red" }}>
                                {errors.details.message}
                            </Typography>
                        )}

                        <Button
                            variant="contained"
                            type="submit"
                            style={{ justifySelf: 'flex-end' }}
                        >
                            Aceptar
                        </Button>
                    </form>

                </div>
            </CustomModal>

        </Grid >
    )
}


export default ClientAccount;