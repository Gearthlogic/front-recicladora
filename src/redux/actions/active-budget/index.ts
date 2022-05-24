import { Dispatch } from "redux";
import { getActiveBudget } from "../../../services/api/budget";
import { ActiveBudgetActionTypes } from "../../types/active-budget";

export const initActiveBudgetActionCreator = () => async (dispatch: Dispatch) => {
  const { data } = await getActiveBudget();

  dispatch({ type: ActiveBudgetActionTypes.INIT_ACTIVE_BUDGET, payload: data });
};

export const inputPaymentActionCreator = (amount: number) => ({
  type: ActiveBudgetActionTypes.INPUT_PAYMENT,
  payload: amount,
});
