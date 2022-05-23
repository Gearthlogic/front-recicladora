import { Typography } from "@material-ui/core";
import { DataGrid, GridColDef } from "@material-ui/data-grid";
import { memo } from "react"

import translateMap from '../../../assets/translations.json'
import { Material } from "../../../constants/enums/material.enum";

const commonColumnsDef: GridColDef = {
    field: '',
    align: 'center',
    width: 100,
    headerAlign: 'center',
    sortable: false,
    disableColumnMenu: true
}

const materialsTableColumns: GridColDef[] = [
    {
        ...commonColumnsDef,
        field: 'material',
        headerName: "Material",
        valueFormatter: (params) => translateMap['es-ES'][params.value as Material]
    },
    {
        ...commonColumnsDef,
        field: 'quantity',
        headerName: "Pesaje",
        valueFormatter: (params) => `${params.value} ${params.row.unit}`
    },
    {
        ...commonColumnsDef,
        field: 'wastePercentage',
        headerName: "Merma",
        width: 80,
        valueFormatter: (params) => `${params.value} %`
    },
    {
        ...commonColumnsDef,
        field: 'finalQuantity',
        headerName: "Cantidad con merma",
        valueFormatter: (params) => `${params.value} ${params.row.unit}`
    },
    {
        ...commonColumnsDef,
        field: 'price',
        headerName: "Precio",
        width: 80,
        valueFormatter: (params) => `$ ${params.value}`
    },
    {
        ...commonColumnsDef,
        field: 'total',
        headerName: "Total",
        valueFormatter: (params) => `$ ${params.value}`
    },
]

interface OrderItemListProps {
    items: any[],
    total?: number
}

function OrderSummary({ items, total }: OrderItemListProps) {

    return (
        <>
            <DataGrid
                autoHeight
                columns={materialsTableColumns}
                rows={items}
                hideFooterPagination
                hideFooter
            />
            {!!total  && (
                <Typography textAlign="end" padding={2} >
                    Total: $ {total}
                </Typography>
            )}
        </>
    )
}

export default memo(OrderSummary);