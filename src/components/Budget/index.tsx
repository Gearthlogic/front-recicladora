import { useCallback, useEffect, useState } from "react";
import Table from "./components/Table";

import { useGlobalLoader } from "../../hooks/UseGlobalLoader";
import { getBudgets } from "../../services/api/budget";
import { Budget } from "../../constants/dto/budget.dto";
import { Button } from "@material-ui/core";
import { Grid } from "@mui/material";
import { useHistory } from "react-router-dom";
import { Path } from "../../constants/enums/path.enum";
import AddLiquidityModal from "./components/AddLiquidityModal";

function BudgetList() {
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [open, setOpen] = useState(false);
  const history = useHistory();

  const fetchBudgets = useGlobalLoader(
    useCallback(async () => {
      const res = await getBudgets();
      setBudgets(res.data);
    }, [])
  );

  useEffect(() => {
    fetchBudgets();
  }, [fetchBudgets]);

  return (
    <Grid container>
      <Grid  container justifyContent="flex-end">
        <Button
          style={{ marginRight: "5px" }}
          onClick={() => setOpen(true)}
          variant="contained"
          color="secondary"
        >
          Agregar presupuesto
        </Button>
        <Button
          onClick={() => history.push(Path.createBudget)}
          variant="contained"
        >
          Crear presupuesto
        </Button>
      </Grid>
      <Table rows={budgets} setRows={setBudgets} />
      <AddLiquidityModal
        open={open}
        onClose={useCallback(() => setOpen(false), [])}
        setBudgets={setBudgets}
      />
    </Grid>
  );
}

export default BudgetList;
