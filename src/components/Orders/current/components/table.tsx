import { DataGrid, GridColDef } from '@material-ui/data-grid';

interface CurrentOrdersTableProps {
    orders: any[]
}

const columns: GridColDef[] = [
    {
        field: 'alias',
        headerName: 'Alias',
        headerAlign: 'center',
        sortable: false,
        width: 150,
    },
    {
        field: 'firstname',
        headerName: 'Nombre',
        headerAlign: 'center',
        sortable: false,
        width: 150,
    },
    {
        field: 'lastname',
        headerName: 'Apellido',
        headerAlign: 'center',
        sortable: false,
        width: 150,
    },
    {
        field: 'email',
        headerName: 'Email',
        headerAlign: 'center',
        sortable: false,
        width: 250,
    },
    {
        field: 'cellphone',
        headerName: 'Telefono',
        headerAlign: 'center',
        sortable: false,
        width: 150,
    },
    {
        field: 'type',
        headerName: 'Tipo',
        headerAlign: 'center',
        filterable: false,
        disableColumnMenu: true,
        width: 150,
    },

];



function CurrentOrdersTable({ orders }: CurrentOrdersTableProps) {


    return (
        <DataGrid
            rows={orders}
            columns={columns}
        />
    );
}






export default CurrentOrdersTable;