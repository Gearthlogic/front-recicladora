import { DataGrid, GridColDef } from "@material-ui/data-grid";
import { Budget } from "../../../../constants/dto/budget.dto";

interface BudgetsTableProps {
  rows: Budget[];
  setRows: React.Dispatch<React.SetStateAction<Budget[]>>;
}

const commonColumnProps: GridColDef = {
  field: "",
  headerAlign: "center",
  align: "center",
  sortable: false,
  width: 150,
  disableColumnMenu: true,
};

export default function BudgetsTable({ rows, setRows }: BudgetsTableProps) {
  const columns: GridColDef[] = [
    {
      ...commonColumnProps,
      field: "initialDate",
      headerName: "Fecha de inicio",
    },
    {
      ...commonColumnProps,
      field: "finalDate",
      headerName: "Fecha de cierre",
    },
    {
      ...commonColumnProps,
      field: "totalAmount",
      headerName: "Presupuesto asignado",
      width: 225,
      valueFormatter: (params) => `$ ${params.value}`
    },
    {
      ...commonColumnProps,
      field: "avaliableAmount",
      headerName: "Presupuesto disponible",
      width: 225,
      valueFormatter: (params) => `$ ${params.value}`
    },
  ];


  return (
    <DataGrid
      rows={rows}
      columns={columns}
      style={{ height: "80vh", width: "95vh" }}
      hideFooterPagination
    />
  );
}
