import { DataGrid, GridColDef } from '@material-ui/data-grid';
import ViewOrder from '../../common/ViewOrder';

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
    },
    {
        field: 'state',
        headerName: 'Estado',
        headerAlign: 'center',
        align: 'center',
        filterable: false,
        disableColumnMenu: true,
        width: 150,
    },
    {
        field: 'address',
        headerName: 'Dirección',
        headerAlign: 'center',
        align: 'center',
        filterable: false,
        disableColumnMenu: true,
        width: 150,
    },
    {
        field: 'type',
        headerName: 'Tipo',
        headerAlign: 'center',
        align: 'center',
        sortable: false,
        width: 150,
    },
    {
        field: 'Actions',
        headerName: 'Acciones',
        headerAlign: 'center',
        align: 'center',
        width: 150,
        sortable: false,
        disableColumnMenu: true,
        renderCell: (params) => <ViewOrder id={params.row.id} />,
    },
];

const CurrentOrdersTable = ({ orders, columns = defaultColumns }: CurrentOrdersTableProps) => {
    console.log(orders)

    return (
        <DataGrid
            rows={orders}
            columns={columns}
            // components={{
            //     NoRowsOverlay: () => <div> No hay registros </div>,
            // }}
            // hideFooterPagination
            style={{
                justifyContent: 'center',
                width: '90vw',
                height: '80vh',
            }}
        />
    );
}






export default CurrentOrdersTable;