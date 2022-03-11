import { DataGrid, GridColDef } from '@material-ui/data-grid';
import Actions from './actions';

interface CurrentOrdersTableProps {
    orders?: any[];
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
        field: 'Actions',
        headerName: 'Acciones',
        headerAlign: 'center',
        align: 'center',
        width: 150,
        sortable: false,
        disableColumnMenu: true,
        renderCell: (params) => <Actions data={params.row} />,
    },
];

const CurrentOrdersTable = ({ orders = []}: CurrentOrdersTableProps) => {

    return (
        <DataGrid
            rows={orders}
            columns={defaultColumns}
            components={{
                // NoRowsOverlay: () => <div> No hay registros </div>,
            }}
            hideFooterPagination
            style={{
                justifyContent: 'center',
                width: '400px',
                height: 'calc(95vh -50px)',
            }}
        />
    );
}

export default CurrentOrdersTable;