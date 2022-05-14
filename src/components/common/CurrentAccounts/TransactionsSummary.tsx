import { DataGrid, GridColDef } from "@material-ui/data-grid";
import moment from "moment";
import { memo } from "react"

import { CurrentAccountTransaction } from "../../../constants/dto/account.dto";

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
        field: 'createdAt',
        headerName: "Fecha",
        valueFormatter: (params) => moment(params.value as string).format('DD-MM-YYYY')
    },
    {
        ...commonColumnsDef,
        field: 'amount',
        headerName: "Monto",
        width: 80,
        valueFormatter: (params) => `$ ${params.value}`
    }
]

interface OrderItemListProps {
    transactions: CurrentAccountTransaction[],
}


function TransactionsSummary({ transactions }: OrderItemListProps) {

    return (
        <>
            <DataGrid
                autoHeight
                columns={materialsTableColumns}
                rows={transactions.map(transaction => ({...transaction, id: transaction.transactionId}) )}
                hideFooterPagination
                hideFooter
            />
        </>
    )
}

export default memo(TransactionsSummary);