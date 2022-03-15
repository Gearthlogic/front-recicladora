import { Button, TextField, Typography } from "@mui/material";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { updateUserPassword } from '../../../../services/api/user';
import { useDispatch } from "react-redux";
import { endLoading, startLoading } from "../../../../redux/actions/loading/loading";
import { setMessage } from "../../../../redux/actions/message";
import { memo } from "react";

interface UserFormData {
    password: string;
}

interface EditUserPasswordFormProps {
    id: number
}

const schema = yup
    .object({
        password: yup.string().required("La contraseña es requerida"),
    }).required();


const EditUserPasswordForm = ({ id }: EditUserPasswordFormProps) => {

    const { handleSubmit, control, formState: { errors } } = useForm<UserFormData>({
        resolver: yupResolver(schema),
    });

    const dispatch = useDispatch();

    const onSubmit: SubmitHandler<UserFormData> = async (data) => {
        dispatch(startLoading())
        try {
            await updateUserPassword({
                ...data, id
            });
            dispatch(setMessage({ action: "Actualización exitosa" }))
        } catch (error) {
            dispatch(setMessage({ action: "Hubo un error" }, 'error'))
        } finally {
            dispatch(endLoading())
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} >
            <Controller
                name="password"
                control={control}
                defaultValue=""
                render={({ field }) => (
                    <TextField
                        label="Nueva contraseña"
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
            <Button type="submit" > Guardar contraseña </Button>
        </form>
    );
};

export default memo(EditUserPasswordForm);
