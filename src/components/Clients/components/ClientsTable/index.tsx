import { DataGrid, GridColDef } from '@material-ui/data-grid';
import ChangeState from './ChangeState';
import EditAction from './EditAction';

const columns: GridColDef[] = [
	{
		field: 'alias',
		headerName: 'Alias',
		headerAlign: 'center',
		width: 150,
	},
	{
		field: 'firstname',
		headerName: 'Nombre',
		headerAlign: 'center',
		width: 150,
	},
	{
		field: 'lastname',
		headerName: 'Apellido',
		headerAlign: 'center',
		width: 150,
	},
	{
		field: 'email',
		headerName: 'Email',
		headerAlign: 'center',
		width: 250,
	},
	{
		field: 'cellphone',
		headerName: 'Telefono',
		headerAlign: 'center',
		width: 150,
	},
	{
		field: 'type',
		headerName: 'Tipo',
		headerAlign: 'center',
		width: 150,
	},
	{
		field: 'active',
		headerName: 'Estado',
		headerAlign: 'center',
		align: 'center',
		width: 150,
		renderCell: (params) => (
			<ChangeState
				active={params.row.active}
				id={params.row.id}
			/>
		)
	},
	{
		field: 'Actions',
		headerName: 'Acciones',
		headerAlign: 'center',
		align: 'center',
		width: 150,
		renderCell: (params) => <EditAction id={params.row.id} />,
	},
];

const translationMap = {
	Permanent: 'Permanente',
	Temporary: 'Temporario',
};

export default function ClientsTable({ rows }: any) {
	const translatedRows = rows.map((row: any) => {
		/* @ts-ignore */
		const type = translationMap[row.type];

		return { ...row, type };
	});

	return (
		<DataGrid
			rows={translatedRows}
			columns={columns}
			pageSize={10}
			rowsPerPageOptions={[5, 10, 20]}
			style={{
				justifyContent: 'center',
				height: '80vh',
			}}
		/>
	);
}
