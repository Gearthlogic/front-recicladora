import { DataGrid, GridColDef } from '@material-ui/data-grid';
import { Link } from '@mui/material';
import { memo } from 'react';
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
        renderCell: (params) => <ViewOrderBtn data={params.row} />,
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
            hideFooterPagination
            style={{
                justifyContent: 'center',
                width: '90vw',
                height: '80vh',
            }}
        />
    );
}

export default memo(CurrentOrdersTable);