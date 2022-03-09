import { yupResolver } from "@hookform/resolvers/yup";
import { Button, MenuItem, OutlinedInput, Select, Typography } from "@material-ui/core";
import { memo } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import * as yup from "yup";

import { Role } from "../../../../constants/enums/role.enum";
import { endLoading, startLoading } from "../../../../redux/actions/loading/loading";
import { setMessage } from "../../../../redux/actions/message";
import { updateUserRoles } from "../../../../services/api/user";

interface UserFormData {
    roles: Role[];
}

interface RolesFormProps {
    id: number;
    roles: Role[];
}

const schema = yup
    .object({
        roles: yup.array(
            yup.mixed().oneOf(Object.values(Role)
            ).required("Debe asignarle un rol al usuario")
        )
    }).required();


function RolesForm({ id, roles }: RolesFormProps) {
    const { handleSubmit, control, formState: { errors } } = useForm<UserFormData>({
        resolver: yupResolver(schema),
    });
    const dispatch = useDispatch();

    const onSubmit: SubmitHandler<UserFormData> = async (data) => {
        dispatch(startLoading())
        try {
            await updateUserRoles({
                ...data, id
            });
            dispatch(setMessage({ message: "Actualización exitosa" }))
        } catch (error) {
            dispatch(setMessage({ message: "Hubo un error" }))
        } finally {
            dispatch(endLoading())
        }
    };


    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
                name="roles"
                control={control}
                defaultValue={roles}
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
            <Button type="submit" > Guardar roles </Button>
        </form>
    )
}


export default memo(RolesForm);