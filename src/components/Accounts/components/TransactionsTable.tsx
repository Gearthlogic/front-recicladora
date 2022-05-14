import { DataGrid, GridColDef } from '@material-ui/data-grid';
import moment from 'moment';

import translations from '../../../assets/translations.json';
import { TransactionType } from '../../../constants/enums/transactionTypes.enum';

interface CurrentOrdersTableProps {
    orders: any[];
    columns?: any[];
    page?: number;
    onPageChange?: void | any;
    onPageSizeChange?: void | any;
    pageSize?: number;
}

const defaultColumns: GridColDef[] = [
    {
        field: 'transactionId',
        headerName: 'ID',
        headerAlign: 'center',
        align: 'center',
        sortable: true,
        width: 150,
    },
    {
        field: 'amount',
        headerName: 'Monto',
        headerAlign: 'center',
        align: 'center',
        width: 150,
        sortable: true,
        filterable: false,
        disableColumnMenu: true,
    },
    {
        field: 'type',
        headerName: 'Tipo',
        headerAlign: 'center',
        align: 'center',
        width: 150,
        disableColumnMenu: true,
        sortable: true,
        valueFormatter: params => translations['es-ES'][params.value as TransactionType]
    },
    {
        field: 'createdAt',
        headerName: 'Fecha',
        headerAlign: 'center',
        align: 'center',
        width: 150,
        disableColumnMenu: true,
        sortable: true,
        valueFormatter: params => moment(params.value as string).format('DD/MM/YYYY')
     }
];


const TransactionsTable = ({
    pageSize,
    onPageSizeChange,
    onPageChange,
    page,
    orders,
    columns = defaultColumns
}: CurrentOrdersTableProps) => {

    return (
        <DataGrid
            rows={orders.map(transaction => ({...transaction, id: transaction.transactionId}) )}
            columns={columns}
            pagination
            rowsPerPageOptions={[5, 10, 20, 30, 40]}
            pageSize={pageSize}
            onPageSizeChange={onPageSizeChange}
            page={page}
            onPageChange={onPageChange}
            style={{
                width: '95vw',
                height: '70vh',
            }}
        />
    );
}

export default TransactionsTable;