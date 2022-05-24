import { useCallback, useEffect, useState } from "react";
import Table from "./components/Table";

import { useGlobalLoader } from "../../hooks/UseGlobalLoader";
import { getBudgets } from "../../services/api/budget";
import { Budget } from "../../constants/dto/budget.dto";

function BudgetList() {
  const [budgets, setBudgets] = useState<Budget[]>([]);

  const fetchBudgets = useGlobalLoader(
    useCallback(async () => {
      const res = await getBudgets();
      setBudgets(res.data);
    }, [])
  );

  useEffect(() => {
    fetchBudgets();
  }, [fetchBudgets]);

  return <Table rows={budgets} setRows={setBudgets} />;
}

export default BudgetList;
