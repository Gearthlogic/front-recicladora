import { Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { createUser } from '../../../services/api/user';
import { Role } from '../../../constants/enums/role.enum';

interface UserFormData {
  username: string;
  password: string;
  roles: Role[];
}

const schema = yup
  .object({
    username: yup.string().required("El usuario es requerido."),
    password: yup.string().required("La contraseña es requerida"),
    roles: yup.array(
      yup.mixed().oneOf(Object.values(Role)
      ).required("Debe asignarle un rol al usuario")
    )
  }).required();

const paperStyle = {
  padding: 30,
  height: "50vh",
  width: 300,
};

const btnstyle = {
  margin: "30px 0"
};

const CreateUser = () => {

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<UserFormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<UserFormData> = async (data) => {
    const { username, password, roles } = data;
    try {
      await createUser(username, password, roles);
    } catch (error) {
      
    }
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
          Registro
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
            Crear usuario
          </Button>
        </form>
      </Paper>
    </Grid>
  );
};

export default CreateUser;
