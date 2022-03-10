import { Button, Grid } from '@material-ui/core';
import { DataGrid, GridColDef } from '@material-ui/data-grid';
import { useHistory } from 'react-router-dom';
import { Path } from '../../../../constants/enums/path.enum';
import { Role } from '../../../../constants/enums/role.enum';
import EditAction from './EditAction';
import { UserTableRow } from '../..';

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
		<Grid container padding={5}>
			<Grid paddingBottom={2} container justifyContent="flex-end" >
				<Button
					onClick={() => history.push(Path.createUser)}
					variant="contained">
					Crear usuario
				</Button>
			</Grid>
			<DataGrid
				rows={rows}
				columns={columns}
				style={{ height: '80vh' }}
				hideFooterPagination
			/>
		</Grid>

	);
}
