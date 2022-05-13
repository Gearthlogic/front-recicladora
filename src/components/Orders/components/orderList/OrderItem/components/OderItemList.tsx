import { DataGrid, GridColDef } from "@material-ui/data-grid"
import { memo } from "react"

import translateMap from '../../../../../../assets/translations.json';
import { Material } from "../../../../../../constants/enums/material.enum";

const commonColumnsDef: GridColDef = {
    field: '',
    align: 'center',
    width: 140,
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
        headerName: "Cantidad",
        valueFormatter: (params) => `${params.value} ${params.row.unit}`
    },
    {
        ...commonColumnsDef,
        field: 'wastePercentage',
        headerName: "Merma",
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
        valueFormatter: (params) => `$ ${params.value}`
    },
    {
        ...commonColumnsDef,
        field: 'total',
        headerName: "Total",
        valueFormatter: (params) => `$ ${params.value}`
    },
]

/* finalInputQuantity: 1200
finalQuantity: null
id: 2
initialInputQuantity: 12000
material: "Iron"
orderId: 4
price: 20
quantity: 10800
total: null
unit: "kg"
wastePercentage: 0 */

interface OrderItemListProps {
    items: any[]
}

function OrderItemList({ items }: OrderItemListProps) {

    return (
        <DataGrid
            style={{ height: 200 }}
            columns={materialsTableColumns}
            rows={items}
            hideFooterPagination
        />
    )
}


export default memo(OrderItemList)