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
import TransactionsTable from "./components/TransactionsTable";
import moment from "moment";

interface TransactionFormData {
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

    const [account, setAccount] = useState<any>();
    const [tableData, setTableData] = useState<any>();
    const [showModal, setShowModal] = useState<boolean>(false);
    const userData = useExtractQueryParamData();

    useEffect(() => {
        dispatch(startLoading());
        getAccount(userData.id).then((response: any) => {
            setAccount({
                accountId: response[0].accountId,
                balance: response[0].balance,
                transactions: response[0].transactions
            })
        })
            .catch(console.log)
            .finally(() => dispatch(endLoading()));

    }, [userData.id, dispatch])

    useEffect(() => {
        generateTableData()
    }, [account])

    const generateTableData = () => {
        const data = account?.transactions.map((e: any) => {
            return {
                id: e.transactionId,
                amount: e.amount,
                details: e.details,
                type: e.type,
                createdAt: moment(e.updatedAt).format("DD-MM-YYYY")
            }
        })
        setTableData(data)
    }

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
            const response = await postCurrentAccountTransaction(toSend)
            console.log(response)
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
                            <span style={{ opacity: .5 }}>{`Alias: `}</span>{`${userData?.alias}`}
                        </Typography>
                    </div>

                    <div style={{ display: 'flex', margin: '5px 25px' }}>
                        <Typography variant="h5">
                            <span style={{ opacity: .5 }}>{`Balance: `}</span>
                            {account?.balance ?
                                account?.balance :
                                '0'
                            }
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

            <div style={{ marginTop: '20px' }}>
                {account?.transactions.length > 0 && tableData?.length > 0 ?
                    <TransactionsTable
                        orders={tableData}
                    // page={1}
                    // pageSize={10}
                    // onPageSizeChange={(newPage: number) => setPageSize(newPage)}
                    // onPageChange={(e: number) => {
                    //     setPageToShow(e)
                    // }}
                    />
                    :
                    <Typography variant="h5" style={{ margin: '5px 30px' }}>
                        <span style={{ opacity: .5 }}>
                            {`No hay registro de transacciones para ${userData?.alias}`}
                        </span>

                    </Typography>
                }
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
                    height: 'auto',
                    paddingBottom: '25px'
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

                        <div
                            style={{
                                paddingTop: '5%',
                                textAlign: 'center',
                            }}
                        >
                            <Button
                                variant="contained"
                                type="submit"
                                style={{ justifySelf: 'flex-end' }}
                            >
                                Aceptar
                            </Button>
                        </div>
                    </form>
                </div>
            </CustomModal>

        </Grid >
    )
}


export default ClientAccount;