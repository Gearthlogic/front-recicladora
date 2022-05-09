import { DataGrid, GridColDef } from '@material-ui/data-grid';
import { Link } from '@mui/material';
import ViewOrderBtn from './ViewOrderBtn';

interface OrdersHistoryTableProps {
    orders: any[];
    columns?: any[];
    page?: number;
    onPageChange?: void | any;
    onPageSizeChange?: void | any;
    pageSize?: number;
}

const defaultColumns: GridColDef[] = [
    {
        field: 'alias',
        headerName: 'Alias',
        headerAlign: 'center',
        align: 'center',
        sortable: false,
        width: 150,
        renderCell: (params) =>
            <Link id={params.row.id} href={`/clients/edit/${params.row.id}`}>
                <span style={{ fontWeight: 600, cursor: 'pointer' }}>
                    {params.row.alias}
                </span>
            </Link>,
    },
    {
        field: 'cellphone',
        headerName: 'Teléfono',
        headerAlign: 'center',
        align: 'center',
        width: 150,
        sortable: false,
        filterable: false,
        disableColumnMenu: true,
    },
    {
        field: 'email',
        headerName: 'E-mail',
        headerAlign: 'center',
        align: 'center',
        width: 150,
        disableColumnMenu: true,
        sortable: true,
    },
    {
        field: 'payableAmount',
        headerName: 'Monto',
        headerAlign: 'center',
        align: 'center',
        width: 150,
        disableColumnMenu: true,
        sortable: true,
    },
    {
        field: 'pickupDate',
        headerName: 'Fecha',
        headerAlign: 'center',
        align: 'center',
        width: 150,
        disableColumnMenu: true,
        sortable: true,
    },
    {
        field: 'state',
        headerName: 'Estado',
        headerAlign: 'center',
        align: 'center',
        width: 150,
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
    },
    {
        field: 'Actions',
        headerName: 'Acciones',
        headerAlign: 'center',
        align: 'center',
        width: 150,
        sortable: false,
        disableColumnMenu: true,
        renderCell: (params) => <ViewOrderBtn id={params.row.id} />,
    },
];

const HistoryOrdersTable = ({
    pageSize,
    onPageSizeChange,
    onPageChange,
    page,
    orders,
    columns = defaultColumns
}: OrdersHistoryTableProps) => {

    return (
        <DataGrid
            rows={orders}
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






export default HistoryOrdersTable;