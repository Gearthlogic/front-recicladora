import { DataGrid, GridColDef } from '@material-ui/data-grid';
import { Link } from '@mui/material';
import ViewOrderBtn from '../../common/ViewOrderBtn';

interface CurrentOrdersTableProps {
    orders: any[];
    columns?: any[];
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

const CurrentOrdersTable = ({ orders, columns = defaultColumns }: CurrentOrdersTableProps) => {

    return (
        <DataGrid
            rows={orders}
            columns={columns}
            components={{
                // NoRowsOverlay: () => <div> No hay registros </div>,
            }}
            // hideFooterPagination
            style={{
                justifyContent: 'center',
                width: '90vw',
                height: '60vh',
            }}
        />
    );
}






export default CurrentOrdersTable;