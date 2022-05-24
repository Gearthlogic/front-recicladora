import { Budget } from "../../constants/dto/budget.dto";
import { ActiveBudgetDispatchTypes } from "../actions/active-budget/type";
import { ActiveBudgetActionTypes } from "../types/active-budget";

export interface ActiveBudgetState {
  budget?: Budget;
}

const initialState: ActiveBudgetState = {
  budget: undefined,
};

export function activeBudgetReducer(
  state: ActiveBudgetState = initialState,
  action: ActiveBudgetDispatchTypes
): ActiveBudgetState {
  switch (action.type) {
    case ActiveBudgetActionTypes.INIT_ACTIVE_BUDGET:
      return { ...state, budget: action.payload };
    case ActiveBudgetActionTypes.INPUT_PAYMENT:
      if (state.budget) {
        const budget = { ...state.budget };

        budget.avaliableAmount -= action.payload;

        return { ...state, budget };
      } else {
        return state;
      }

    default:
      return state;
  }
}
