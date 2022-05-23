import { Button, IconButton, Grid, MenuItem, Select, TextField } from "@material-ui/core";
import { memo, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { AddOutlined, Balance } from "@mui/icons-material";
import { DataGrid, GridColDef } from "@material-ui/data-grid";

import { Material } from "../../../../../../constants/enums/material.enum";
import translations from '../../../../../../assets/translations.json'
import { ClientType } from "../../../../../../constants/enums/client.enum";
import { createOrderItems } from "../../../../../../services/api/orders";
import { CreateOrderMaterialItemDTO, GetCurrentOrderDTO } from '../../../../../../constants/dto/order.dto'
import { useGlobalLoader } from "../../../../../../hooks/UseGlobalLoader";
import { OrderState } from "../../../../../../constants/enums/orderStates.enum";

interface CreateItemsFormProps {
    id: number;
    type: ClientType;
    setOrders: React.Dispatch<React.SetStateAction<GetCurrentOrderDTO[]>>
    readFromSerial : Function
}

const materialsTableColumns: GridColDef[] = [
    {
        field: 'material',
        headerName: "Material",
        width: 140,
        sortable: false,
        disableColumnMenu: true,
    },
    {
        field: 'initialInputQuantity',
        headerName: "Entrada",
        width: 140,
        sortable: false,
        disableColumnMenu: true,
        valueFormatter: (params) => params.value + ' kg'
    },
    {
        field: 'finalInputQuantity',
        headerName: "Salida",
        sortable: false,
        disableColumnMenu: true,
        width: 140,
        valueFormatter: (params) => params.value + ' kg'
    },
    {
        field: 'quantity',
        headerName: "Final",
        width: 140,
        sortable: false,
        disableColumnMenu: true,
        valueFormatter: (params) => (params.row.initialInputQuantity - params.row.finalInputQuantity) + ' kg'
    },
]

type WeigthInputField = 'finalInputQuantity' | "initialInputQuantity";

function CreateItemsForm({ id, type, setOrders, readFromSerial }: CreateItemsFormProps) {
    const { control, handleSubmit, setValue, reset } = useForm<CreateOrderMaterialItemDTO>();
    const [itemList, setItemList] = useState<CreateOrderMaterialItemDTO[]>([]);

    const isPriceVisible = useMemo(() => type === ClientType.Temporary, [type]);

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

    function createWeigthInput(label: string, fieldName: WeigthInputField) {
        return (
            <>
                <Controller
                    name={fieldName}
                    control={control}
                    defaultValue={0}
                    render={({ field }) => (
                        <TextField
                            id={label}
                            type="number"
                            label={label}
                            {...field}
                        />
                    )}
                />
                <IconButton
                    onClick={async () => {
                        try {
                            const result = await readFromSerial();
                            const newValue = result || 0;
                            const input =  document.getElementById(label);
    
                            input?.focus()
                            setValue(fieldName, newValue);
                        }catch(error: any) {
                            alert(error.message)
                        }
                    }}
                >
                    <Balance />
                </IconButton>
            </>
        )
    }

    function submitAddItem(data: CreateOrderMaterialItemDTO) {
        setItemList(prev => prev.concat(data));
        reset();
    }

    const submitOrderItems = useGlobalLoader(async () => {
        const res = await createOrderItems({ id, items: itemList });
        
        setOrders(prev => {
            const newOrders = prev ? [...prev] : []
            const currentOrder = newOrders?.find(order => order.id === id);

            if(currentOrder){
                currentOrder.state = OrderState.Controlling;
                currentOrder.items = res.data;
            }

            return newOrders;
        })
    })

    return (
        <Grid container marginBottom={2} >
            <Grid item xs={12} marginBottom={5}>
                <form onSubmit={handleSubmit(submitAddItem)}>
                    <Grid container alignItems="center">
                        <Controller
                            name="material"
                            control={control}
                            defaultValue={Material.Iron}
                            render={({ field }) => (
                                <Select
                                    sx={{ width: 150, marginRight: 2 }}
                                    labelId="material-select"
                                    {...field} >
                                    {allowedMaterials.map(material => (
                                        <MenuItem key={material} value={material} >
                                            {translations['es-ES'][material]}
                                        </MenuItem>
                                    ))}
                                </Select>
                            )}
                        />
                        {createWeigthInput("Peso entrada", "initialInputQuantity")}
                        {createWeigthInput("Peso salida", "finalInputQuantity")}
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
                    </Grid>
                </form>
            </Grid >
            <Grid item xs={10}>
                <DataGrid
                    style={{ height: 200 }}
                    columns={materialsTableColumns}
                    rows={itemList.map(item => ({ ...item, id: item.material }))}
                    hideFooterPagination
                />
            </Grid>
            <Grid item xs={2}>
                <Button onClick={submitOrderItems}> Crear items de la orden </Button>
            </Grid>
        </Grid >
    );
}

export default memo(CreateItemsForm)