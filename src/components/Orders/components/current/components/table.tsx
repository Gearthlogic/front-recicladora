import { DataGrid, GridColDef } from '@material-ui/data-grid';

interface CurrentOrdersTableProps {
    orders: any[];
    columns?: any[];
}

const defaultColumns: GridColDef[] = [
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

const CurrentOrdersTable = ({ orders, columns = defaultColumns }: CurrentOrdersTableProps) => {
console.log(columns)
    return (
        <DataGrid
            rows={orders}
            columns={columns}
            components={{
                NoRowsOverlay: () => <div> No hay registros </div>,
            }}
            // hideFooterPagination
            style={{
				justifyContent: 'center',
                width:'90vw',
				height: '80vh',
			}}
        />
    );
}






export default CurrentOrdersTable;