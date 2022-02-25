import {DataGrid, GridColDef} from '@material-ui/data-grid';
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
		field: 'type',
		headerName: 'Tipo',
		width: 150,
	},
	{
		field: 'Edit',
		headerName: 'Editar',
		align: 'center',
		width: 100,
		renderCell: (params) => {
			return (
				<div style={{cursor: 'pointer'}}>
					<ChangeState
						successCallback={() => {
							params.row.active = !params.row.active;
						}}
						active={params.row.active}
						id={params.row.id}
					/>
				</div>
			);
		},
	},
	{
		field: 'Actions',
		headerName: 'Estado',
		align: 'center',
		width: 100,
		renderCell: (params) => {
			return (
				<div style={{cursor: 'pointer'}}>
					<EditAction index={params.row.id} />
				</div>
			);
		},
	},
];

const translationMap = {
	Permanent: 'Permanente',
	Temporary: 'Temporario',
};

export default function ClientsTable({rows}: any) {
	const translatedRows = rows.map((row: any) => {
		/* @ts-ignore */
		const type = translationMap[row.type];

		return {...row, type};
	});

	return (
		<div>
			<DataGrid
				rows={translatedRows}
				columns={columns}
				pageSize={10}
				rowsPerPageOptions={[5, 10, 20]}
				style={{
					width: '70%',
					justifyContent: 'center',
					height: '80vh',
					marginLeft: '15%',
				}}
			/>
		</div>
	);
}
