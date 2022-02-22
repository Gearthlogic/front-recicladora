import { DataGrid, GridColDef } from '@material-ui/data-grid';
import EditAccion from './EditAccion';


const columns: GridColDef[] = [
    {
        field: 'alias',
        headerName: 'Alias',
        width: 150,

    },
    {
        field: 'firstname',
        headerName: 'Nombre',
        width: 150,

    },
    {
        field: 'lastname',
        headerName: 'Apellido',
        width: 150,

    },
    {
        field: 'email',
        headerName: 'Email',
        width: 200,

    },
    {
        field: 'cellphone',
        headerName: 'Telefono',
        width: 150,

    },
    {
        field: "actions",
        headerName: "Actions",
        sortable: false,
        align: "center",
        width: 140,
        renderCell: (params) => {
            return (
                <div style={{ cursor: "pointer" }}>
                    <EditAccion index={params.row.id} state={params.row.type} />
                </div>
            );
        }
    }
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

            />
        </div>
    );
}



