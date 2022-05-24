import { ActiveBudgetActionTypes } from "../../types/active-budget";
import { Budget } from "../../../constants/dto/budget.dto";

export interface IActionInitActiveBudget {
  type: typeof ActiveBudgetActionTypes.INIT_ACTIVE_BUDGET;
  payload: Budget;
}

export interface IActionInputPayment {
  type: typeof ActiveBudgetActionTypes.INPUT_PAYMENT;
  payload: number;
}

export type ActiveBudgetDispatchTypes =
  | IActionInitActiveBudget
  | IActionInputPayment;
