import { Button, Grid, MenuItem, OutlinedInput, Paper, Select, TextField, Typography } from "@mui/material";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { createUser } from '../../../services/api/user';
import { Role } from '../../../constants/enums/role.enum';
import { useDispatch } from "react-redux";
import { endLoading, startLoading } from "../../../redux/actions/loading/loading";
import { useHistory } from "react-router-dom";
import { Path } from "../../../constants/enums/path.enum";
import { setMessage } from "../../../redux/actions/message";

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
  margin: 10,
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

  const dispatch = useDispatch();
  const history = useHistory();

  const onSubmit: SubmitHandler<UserFormData> = async (data) => {
    dispatch(startLoading())
    try {
      await createUser(data);
      history.push(Path.usersList);
    } catch (error) {
      dispatch(setMessage({ action: "Hubo un error" }, 'error'))
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
      <Paper elevation={10} style={paperStyle}>
        <Typography align="center" variant="h4" margin={2}>
          Crear usuario
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="username"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                label="Nombre de usuario"
                placeholder="Ingrese el nombre de usuario"
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
            defaultValue=""
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
          <Controller
            name="roles"
            control={control}
            defaultValue={[]}
            render={({ field }) => (
              <Select
                fullWidth
                labelId="roles-select-label"
                id="roles-select"
                multiple
                defaultValue={[Role.Purchaser]}
                input={<OutlinedInput id="roles-imput" label="Roles" />}
                {...field}
              >
                {Object.values(Role).map((name) => (
                  <MenuItem key={name} value={name}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
          {errors.roles?.map(error => (
            <Typography variant="subtitle2" style={{ color: "red" }}>
              {error.message}
            </Typography>
          ))}
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
    </Grid >
  );
};

export default CreateUser;
