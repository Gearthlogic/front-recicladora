import { Button, Grid } from '@material-ui/core';
import { DataGrid, GridColDef } from '@material-ui/data-grid';
import { useHistory } from 'react-router-dom';
import { Path } from '../../../../constants/enums/path.enum';
import EditAction from './EditAction';
import { UserTableRow } from '../../../Users';
import { Budget } from '../../../../constants/dto/budget.dto';

interface BudgetsTableProps {
	rows: Budget[],
	setRows: React.Dispatch<React.SetStateAction<Budget[]>>
}

const commonColumnProps : GridColDef ={
	field: '',
	headerAlign: 'center',
	align: 'center',
	sortable: false,
	width: 150,
	disableColumnMenu: true,
}

export default function BudgetsTable({ rows, setRows }: BudgetsTableProps) {
	const columns: GridColDef[] = [
		{
			...commonColumnProps,
			field: 'initialDate',
			headerName: 'Fecha de inicio',
		},
		{
			...commonColumnProps,
			field: 'finalDate',
			headerName: 'Fecha de cierre',
		
		},
		{
			...commonColumnProps,
			field: 'totalAmount',
			headerName: 'Presupuesto asignado',
		},
		{
			...commonColumnProps,
			field: 'avaliableAmount',
			headerName: 'Presupuesto disponible',
		},
	];

	const history = useHistory();

	return (
		<Grid container>
			<Grid paddingBottom={2} container justifyContent="flex-end" >
				<Button
					onClick={() => history.push(Path.createBudget)}
					variant="contained">
					Crear presupuesto
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
