import { Button, Grid } from '@material-ui/core';
import { DataGrid, GridColDef } from '@material-ui/data-grid';
import { useHistory } from 'react-router-dom';
import { Path } from '../../../../constants/enums/path.enum';
import EditAction from './EditAction';
import { UserTableRow } from '../..';
import transalations from '../../../../assets/translations.json';
import { Role } from '../../../../constants/enums/role.enum';

interface ClientsTableProps {
	rows: UserTableRow[],
	setRows: React.Dispatch<React.SetStateAction<UserTableRow[]>>
}

export default function ClientsTable({ rows, setRows }: ClientsTableProps) {
	const columns: GridColDef[] = [
		{
			field: 'username',
			headerName: 'Nombre de usuario',
			headerAlign: 'center',
			sortable: true,
			align: 'center',
			width: 250,
			disableColumnMenu: true,
		},
		{
			field: 'roles',
			headerName: 'Roles',
			headerAlign: 'center',
			align: 'center',
			sortable: false,
			width: 150,
			disableColumnMenu: true,
			valueFormatter: params => transalations["es-ES"][params.value as Role]
		},
		{
			field: 'Actions',
			headerName: 'Acciones',
			headerAlign: 'center',
			align: 'center',
			sortable: false,
			disableColumnMenu: true,
			width: 150,
			renderCell: (params) => (
				<EditAction
					data={params.row}
					setRows={setRows}
				/>
			)
		},
	];

	const history = useHistory();

	return (
		<Grid container>
			<Grid container justifyContent="flex-end" >
				<Button
					onClick={() => history.push(Path.createUser)}
					variant="contained">
					Crear usuario
				</Button>
			</Grid>
			<DataGrid
				rows={rows}
				columns={columns}
				style={{ height: '80vh', width: '95vh' }}
				hideFooterPagination
			/>
		</Grid>

	);
}
