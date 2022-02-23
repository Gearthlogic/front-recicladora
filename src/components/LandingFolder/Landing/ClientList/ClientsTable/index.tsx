import { DataGrid, GridColDef } from '@material-ui/data-grid';
import ChangeState from './ChangeState';
import EditAction from './EditAction';


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
        width: 150,

    },
    {
        field: 'cellphone',
        headerName: 'Telefono',
        width: 120,

    },
    {
        field: 'Actions',
        headerName: 'Tipo',
        width: 150,

    },
    {
        field: "Edit",
        headerName: "Editar",
        align: "center",
        width: 100,
        renderCell: (params) => {
            return (
                <div style={{ cursor: "pointer" }}>
                    <ChangeState index={params.row.id} />
                </div>
            );
        }
    },
    {
        field: "Actions",
        headerName: "Estado",
        align: "center",
        width: 100,
        renderCell: (params) => {
            return (
                <div style={{ cursor: "pointer" }}>
                    <EditAction index={params.row.id} />
                </div>
            );
        }
    }
];


export default function ClientsTable({ rows }: any) {

    const translateRows = rows.map((row: any) => {
        if (row.type === 'permanent') {
            return { ...row, type: 'Permanente' }
        } else if (row.type === 'temporary') {
            return { ...row, type: 'Temporario' }
        }
    })


    return (
        <div>
            <DataGrid
                rows={translateRows}
                columns={columns}
                pageSize={10}
                style={{ width: '70%', justifyContent: 'center', height: '80vh', marginLeft: '15%' }}

            />
        </div>
    );
}



