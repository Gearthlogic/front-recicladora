import { Button, Grid, TextField } from "@material-ui/core";
import { FormEventHandler, memo, useMemo, useState } from "react";

import MaterialSelect from '../../../../common/Form/MaterialsSelect';
import { ControlOrderItemDTO } from "../../../../../constants/dto/order.dto";
import { Material } from "../../../../../constants/enums/material.enum";
import { controlOrderItem } from '../../../../../services/api/orders';
import { useDispatch } from "react-redux";
import { endLoading, startLoading } from "../../../../../redux/actions/loading/loading";
import { setMessage } from "../../../../../redux/actions/message";

function ItemControlForm({ quantity, material, id, unit, wastePercentage }: ControlOrderItemDTO) {
    const [selectedMaterial, setSelectedMaterial] = useState(material);
    const [selectedWastePercentage, setselectedWastePercentage] = useState(wastePercentage);

    const dispatch = useDispatch();

    const finalQuantity = useMemo(() => {
        return (quantity * (1 - (selectedWastePercentage / 100))).toFixed(2);
    }, [quantity, selectedWastePercentage])

    const submitMaterialControl: FormEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault();
        dispatch(startLoading());
        try {
            await controlOrderItem({
                id, 
                material: selectedMaterial, 
                wastePercentage: selectedWastePercentage
            });

            dispatch(setMessage({ message: "Actualziación axitosa" }));
        } catch {
            dispatch(setMessage({ message: "Error al actualizar. Vuelva a intentarlo" }));
        } finally {
            dispatch(endLoading());
        }
    }

    return (
        <form style={{width: '100%'}}  onSubmit={submitMaterialControl}>
            <Grid
                container
                justifyContent="space-between"
                alignItems="center"
                flexDirection="row"
            >
                <MaterialSelect
                    value={selectedMaterial}
                    onChange={event => setSelectedMaterial(event.target.value as Material)}
                />
                <TextField
                    label="Pesada original"
                    disabled
                    value={`${quantity} ${unit}`}
                />
                <TextField
                    type="number"
                    label="Porcentaje de merma"
                    value={selectedWastePercentage}
                    onChange={event => setselectedWastePercentage(parseInt(event.target.value))}
                />
                <TextField
                    label="Pesada con merma"
                    disabled
                    value={finalQuantity}
                />
                <Button type="submit" >
                    Actualizar
                </Button>
            </Grid>
        </form>
    )
}

export default memo(ItemControlForm);