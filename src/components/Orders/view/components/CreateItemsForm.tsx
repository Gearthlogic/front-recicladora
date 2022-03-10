import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from "@material-ui/core";

import { memo, useMemo, useState } from "react";
import { Material } from "../../../../constants/enums/material.enum";
import translations from '../../../../assets/translations.json'
import { Controller, useForm } from "react-hook-form";
import { ClientType } from "../../../../constants/enums/client.enum";
import { AddOutlined } from "@mui/icons-material";
import { DataGrid, GridColDef } from "@material-ui/data-grid";
import { createOrderItems, OrderItemDTO } from "../../../../services/api/orders";
import { useHistory } from "react-router-dom";
import { Path } from "../../../../constants/enums/path.enum";
import { useDispatch } from "react-redux";
import { endLoading, startLoading } from "../../../../redux/actions/loading/loading";

interface CreateItemsFormProps {
    id: number;
    type: ClientType;
}

const materialsTableColumns: GridColDef[] = [
    {
        field: 'material',
        headerName: "Material",
        width: 150
    },
    {
        field: 'quantity',
        headerName: "Peso",
        width: 150,
        valueFormatter: (params) => params.value + ' kg'
    },
]

function CreateItemsForm({ id, type }: CreateItemsFormProps) {
    const history = useHistory();
    const dispatch = useDispatch()

    const { control, handleSubmit, formState: { errors } } = useForm<OrderItemDTO>();
    const [itemList, setItemList] = useState<OrderItemDTO[]>([]);

    const isPriceVisible = useMemo(() => type === ClientType.Temporary, [type])
    const allowedMaterials = useMemo(
        () => Object.values(Material).filter(material => !itemList.some(item => item.material === material)),
        [itemList]
    );

    if (isPriceVisible) {
        materialsTableColumns.push({
            field: 'price',
            headerName: "Precio",
            width: 150
        });
    }

    function submitAddItem(data: OrderItemDTO) {
        setItemList(prev => prev.concat(data));
    }

    async function submitOrderItems() {
        dispatch(startLoading())
        try {
            await createOrderItems(
                { id, items: itemList }
            );

            history.push(Path.orderList);
        } catch (error) {

        }finally {
            dispatch(endLoading())
        }
    }

    return (
        <Grid container>
            <Grid item xs={8} marginBottom={5}>
                <form onSubmit={handleSubmit(submitAddItem)}>
                    <Controller
                        name="material"
                        control={control}
                        defaultValue={Material.Iron}
                        render={({ field }) => (
                            <FormControl>
                                <InputLabel id="material-select" >Material </InputLabel>
                                <Select
                                    sx={{ width: 150 }}
                                    labelId="material-select"
                                    {...field} >
                                    {allowedMaterials.map(material => (
                                        <MenuItem key={material} value={material} >
                                            {translations['es-ES'][material]}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        )}
                    />
                    <Controller
                        name="quantity"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                type="number"
                                label="Peso"
                                {...field}
                            />
                        )}
                    />
                    {isPriceVisible &&
                        <Controller
                            name="price"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    type="number"
                                    label="precio"
                                    {...field}
                                />
                            )}
                        />
                    }
                    <Button type="submit"> <AddOutlined /> </Button>
                </form>
            </Grid>
            <Grid item xs={6}>
                <DataGrid
                    style={{height: 300}}
                    columns={materialsTableColumns}
                    rows={itemList.map(item => ({ ...item, id: item.material }))}
                    hideFooterPagination
                />
                <Button onClick={submitOrderItems}> Crear items de la orden </Button>
            </Grid>
        </Grid>
    );
}

export default memo(CreateItemsForm)