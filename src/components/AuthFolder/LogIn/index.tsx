import { Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { Link } from "react-router-dom";
import { paths } from "../../../routes/paths";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useEffect } from "react";
import { actionLogin } from '../../../redux/actions';
import { useDispatch, useSelector } from "react-redux";
import { RootStore } from "../../../redux";

interface FormData {
  username: string;
  password: string;
}

const schema = yup
  .object({
    username: yup.string().required("El usuario es requerido."),
    password: yup.string().required("La contraseña es requerida"),
  })
  .required();

const LogIn = () => {
  const auth = useSelector((state: RootStore) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(auth);
  }, []);

  const paperStyle = {
    padding: 30,
    height: 420,
    width: 300,
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
    const { username, password } = data;
    dispatch(actionLogin(username, password));
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
          Login
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="username"
            control={control}
            defaultValue="a"
            render={({ field }) => (
              <TextField
                label="Usuario"
                placeholder="Ingrese su usuario"
                fullWidth
                margin="normal"
                {...field}
              />
            )}
          />
          {errors.username && (
            <Typography variant="subtitle2" style={{ color: "red" }}>
              {errors.username.message}
            </Typography>
          )}
          <Controller
            name="password"
            control={control}
            defaultValue="a"
            render={({ field }) => (
              <TextField
                label="Contraseña"
                placeholder="Ingrese su contraseña"
                type="password"
                fullWidth
                margin="normal"
                {...field}
              />
            )}
          />
          {errors.password && (
            <Typography variant="subtitle2" style={{ color: "red" }}>
              {errors.password.message}
            </Typography>
          )}
          <Button
            type="submit"
            color="primary"
            variant="contained"
            style={btnstyle}
            fullWidth
          >
            Iniciar Sesión
          </Button>
        </form>
        <Typography align="center">
          No tiene una cuenta? <Link to={paths.register}>Registrese</Link>
        </Typography>
      </Paper>
    </Grid>
  );
};

export default LogIn;
