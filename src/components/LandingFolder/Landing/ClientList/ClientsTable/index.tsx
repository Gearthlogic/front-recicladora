import * as React from 'react';
import { DataGrid, GridColDef } from '@material-ui/data-grid';
import { FaEdit } from 'react-icons/fa'

const columns: GridColDef[] = [
    {
        field: 'alias',
        headerName: 'Alias',
        width: 150,
        editable: true,
    },
    {
        field: 'firstname',
        headerName: 'Nombre',
        width: 150,
        editable: true,
    },
    {
        field: 'lastname',
        headerName: 'Apellido',
        width: 150,
        editable: true,
    },
    {
        field: 'email',
        headerName: 'Email',
        width: 200,
        editable: true,
    },
    {
        field: 'cellphone',
        headerName: 'Telefono',
        width: 150,
        editable: true,
    },
    {
        field: 'editar',
        headerName: 'Editar',
        width: 150,
        editable: true,
    },
];


export default function ClientsTable({ rows }: any) {

    const editRows = rows.map((row: any) => {

        const icon = 'icon'

        return {
            ...row, editar: icon
        }
    })

    return (
        <div style={{ height: 400, width: '50%', alignItems: 'center', textAlign: 'center', justifyContent: 'center' }}>
            <DataGrid
                rows={editRows}
                columns={columns}
                pageSize={5}
                disableSelectionOnClick
            />
        </div>
    );
}



