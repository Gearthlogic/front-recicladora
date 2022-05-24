import { Dispatch, memo, SetStateAction } from "react";
import { TextField, Typography } from "@mui/material";
import * as yup from "yup";

import { AddLiquidityDTO, Budget } from "../../../../constants/dto/budget.dto";
import { useGlobalLoader } from "../../../../hooks/UseGlobalLoader";
import { addLiquidityToBudget } from "../../../../services/api/budget";
import CustomModal from "../../../common/Modal/CustomModal";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Button, Grid } from "@material-ui/core";
import { yupResolver } from "@hookform/resolvers/yup";

interface AddLqiuidityModalProps {
  open: boolean;
  onClose: () => void;
  setBudgets: Dispatch<SetStateAction<Budget[]>>;
}

const schema = yup
  .object({
    newAmount: yup
      .number()
      .required("El monto es requerido")
      .min(1, "Debe ser mayor a 0"),
  })
  .required();

function AddLqiuidityModal({
  open,
  onClose,
  setBudgets,
}: AddLqiuidityModalProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AddLiquidityDTO>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<AddLiquidityDTO> = useGlobalLoader(
    async (dispatch, data) => {
      await addLiquidityToBudget(data);
      setBudgets((prev) => {
        const newBudgets = [...prev];
        const activeBudget = newBudgets.find((budget) => budget.active);
        if (activeBudget) {
          activeBudget.avaliableAmount += data.newAmount;
          activeBudget.totalAmount += data.newAmount;
        }
        return newBudgets;
      });
      onClose();
    }
  );

  return (
    <CustomModal
      dialogProps={{
        open,
        onClose,
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="newAmount"
          control={control}
          defaultValue={0}
          render={({ field }) => (
            <TextField
              label="Monto a ingresar"
              placeholder="Ingrese el monto a agregar"
              fullWidth
              margin="normal"
              {...field}
            />
          )}
        />
        {errors.newAmount && (
          <Typography variant="subtitle2" style={{ color: "red" }}>
            {errors.newAmount.message}
          </Typography>
        )}
        <Grid container justifyContent="center">
        <Button variant="contained" type="submit">Agregar presupuesto</Button>
        </Grid>
      </form>
    </CustomModal>
  );
}

export default memo(AddLqiuidityModal);
