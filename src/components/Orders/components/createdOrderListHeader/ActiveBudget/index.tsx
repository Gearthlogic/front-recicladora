import { memo, useCallback, useEffect } from "react";
import { Grid, Typography } from "@material-ui/core";
import { useSelector } from "react-redux";

import { RootStore } from "../../../../../redux";
import { Budget } from "../../../../../constants/dto/budget.dto";
import { useGlobalLoader } from "../../../../../hooks/UseGlobalLoader";
import { initActiveBudgetActionCreator } from "../../../../../redux/actions/active-budget";

const CreateOrder = () => {
  const activeBudget = useSelector<RootStore, Budget | undefined>(
    (state) => state.activeBudget.budget
  );

  const fetchActiveBudget = useGlobalLoader(
    useCallback(async (dispatch) => {
      dispatch(initActiveBudgetActionCreator());
    }, [])
  );

  useEffect(() => {
    fetchActiveBudget();
  }, [fetchActiveBudget]);

  return (
    <Grid>
      <Typography textAlign="center" variant="h5">
        {activeBudget
          ? `Presupuesto disponible: $ ${activeBudget.avaliableAmount}`
          : "No hay presupuesto activo"}
      </Typography>
    </Grid>
  );
};

export default memo(CreateOrder);
