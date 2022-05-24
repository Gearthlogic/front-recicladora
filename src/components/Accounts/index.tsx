import { Typography } from "@material-ui/core";
import { Button, Grid, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useExtractQueryParamData } from "../../hooks/useQueryParamData";
import { endLoading, startLoading } from "../../redux/actions/loading/loading";
import {
  getAccount,
  postCurrentAccountTransaction,
} from "../../services/api/account";
import CustomModal from "../common/Modal/CustomModal";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { setMessage } from "../../redux/actions/message";
import TransactionsTable from "./components/TransactionsTable";


interface TransactionFormData {
  amount: number;
}

const schema = yup
  .object({
    amount: yup
      .number()
      .min(1, "Por favor, establezca monto positivo.")
      .typeError("Ingrese números solamente, por favor.")
      .required("Ingrese un monto"),
  })
  .required();

const ClientAccount = () => {
  const dispatch = useDispatch();

  const [account, setAccount] = useState<any>();
  const [showModal, setShowModal] = useState<boolean>(false);

  const [pageToShow, setPageToShow] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(20);

  const userData = useExtractQueryParamData();

  useEffect(() => {
    dispatch(startLoading());

    getAccount(userData.id)
      .then((data) => setAccount(data))
      .catch(console.log)
      .finally(() => dispatch(endLoading()));
  }, [userData.id, dispatch]);

  const {
    reset,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TransactionFormData>({
    resolver: yupResolver(schema),
  });

  const handleShowModal = () => {
    setShowModal(!showModal);
    reset();
  };

  const onSubmit: SubmitHandler<TransactionFormData> = async (formData) => {
    dispatch(startLoading());

    const toSend = { ...formData, clientId: account.clientId };

    try {
      const { data } = await postCurrentAccountTransaction(toSend);

      setAccount((prev: any) => ({
        ...account,
        alance: account?.balance - data.amount,
        transactions: prev.transactions.concat(data),
      }));

      handleShowModal();
      dispatch(setMessage({ action: "Operación Exitosa" }));
    } catch (error) {
      dispatch(setMessage({ action: "ERROR - Operación incorrecta" }, "error"));
    } finally {
      dispatch(endLoading());
    }
  };

  return (
    <Grid container>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <div style={{ display: "flex" }}>
          <div style={{ display: "flex", margin: "5px" }}>
            <Typography variant="h5">
              <span style={{ opacity: 0.5 }}>{`Alias: `}</span>
              {`${userData?.alias}`}
            </Typography>
          </div>

          <div style={{ display: "flex", margin: "5px 25px" }}>
            <Typography variant="h5">
              <span style={{ opacity: 0.5 }}>{`Balance: `}</span>
              {account?.balance ? account?.balance : "0"}
            </Typography>
          </div>
        </div>

        <Button variant="contained" onClick={handleShowModal}>
          Crear Transacción
        </Button>
      </div>

      <div style={{ marginTop: "20px" }}>
        {account?.transactions.length > 0 ? (
          <TransactionsTable
            orders={account?.transactions}
            page={pageToShow}
            pageSize={pageSize}
            onPageSizeChange={(newPage: number) => setPageSize(newPage)}
            onPageChange={(e: number) => {
              setPageToShow(e);
            }}
          />
        ) : (
          <Typography variant="h5" style={{ margin: "5px 30px" }}>
            <span style={{ opacity: 0.5 }}>
              {`No hay registro de transacciones para ${userData?.alias}`}
            </span>
          </Typography>
        )}
      </div>

      <CustomModal
        dialogProps={{
          open: showModal,
          onClose: handleShowModal,
        }}
      >
        <Grid container>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid
              padding={2}
              container
              flexDirection="column"
              justifyContent="center"
            >
              <Typography variant="h5" style={{ margin: "20px" }}>
                Crear adelanto
              </Typography>

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
              <Button
                variant="contained"
                type="submit"
                style={{ justifySelf: "flex-end" }}
              >
                Aceptar
              </Button>
            </Grid>
          </form>
        </Grid>
      </CustomModal>
    </Grid>
  );
};

export default ClientAccount;
