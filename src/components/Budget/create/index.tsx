import { Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { useHistory } from "react-router-dom";
import { Path } from "../../../constants/enums/path.enum";
import { postBudget } from "../../../services/api/budget";
import { useGlobalLoader } from "../../../hooks/UseGlobalLoader";
import { CreateBudgetDTO } from "../../../constants/dto/budget.dto";
import { DesktopDatePicker, LocalizationProvider } from "@mui/lab";
import AdapterMoment from "@mui/lab/AdapterMoment";
import moment from "moment";

const schema = yup
  .object({
    initialDate: yup.date().required("Es requerido"),
    finalDate: yup
      .date()
      .required("Es requerido")
      .min(
        yup.ref("initialDate"),
        "La fecha de finalización debe ser mayor a la de inicio"
      ),
    initialAmount: yup
      .number()
      .required("El monto es requerido")
      .min(1, "Debe ser mayor a 0"),
  })
  .required();

const paperStyle = {
  padding: 30,
  margin: 10,
  width: 300,
};

const CreateBudget = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CreateBudgetDTO>({
    resolver: yupResolver(schema),
  });

  const history = useHistory();

  const onSubmit: SubmitHandler<CreateBudgetDTO> = useGlobalLoader(
    async (dispatch, data) => {
      data.initialDate = moment(data.initialDate).format("YYYY-MM-DD");
      data.finalDate = moment(data.finalDate).format("YYYY-MM-DD");

      await postBudget(data);
      history.push(Path.budget);
    }
  );

  return (
    <Grid container alignItems="center" justifyContent="center">
      <Paper elevation={10} style={paperStyle}>
        <Typography align="center" variant="h4" margin={2}>
          Crear presupuesto
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <Controller
              name="initialDate"
              control={control}
              defaultValue={moment().format("MM/DD/YYYY")}
              render={({ field }) => (
                <DesktopDatePicker
                  label="Fecha de inicio"
                  inputFormat="MM/DD/YYYY"
                  minDate={moment()}
                  {...field}
                  renderInput={(params) => (
                    <TextField margin="normal" fullWidth {...params} />
                  )}
                />
              )}
            />
            {errors.initialDate && (
              <Typography variant="subtitle2" style={{ color: "red" }}>
                {errors.initialDate.message}
              </Typography>
            )}
            <Controller
              name="finalDate"
              control={control}
              defaultValue={moment().add(1, "weeks").format("MM/DD/YYYY")}
              render={({ field }) => (
                <DesktopDatePicker
                  label="Fecha de finalización"
                  inputFormat="MM/DD/YYYY"
                  {...field}
                  renderInput={(params) => (
                    <TextField margin="normal" fullWidth {...params} />
                  )}
                />
              )}
            />
            {errors.finalDate && (
              <Typography variant="subtitle2" style={{ color: "red" }}>
                {errors.finalDate.message}
              </Typography>
            )}
          </LocalizationProvider>

          <Controller
            name="initialAmount"
            control={control}
            defaultValue={0}
            render={({ field }) => (
              <TextField
                label="Monto inicial"
                placeholder="Ingrese el monto inicial"
                fullWidth
                margin="normal"
                {...field}
              />
            )}
          />
          {errors.initialAmount && (
            <Typography variant="subtitle2" style={{ color: "red" }}>
              {errors.initialAmount.message}
            </Typography>
          )}
          <Button type="submit" color="primary" variant="contained" fullWidth>
            Crear presupuesto
          </Button>
        </form>
      </Paper>
    </Grid>
  );
};

export default CreateBudget;
