export interface Budget {
  id: number;
  initialDate: string;
  finalDate: string;
  initialAmount: number;
  avaliableAmount: number;
  totalAmount: number;
  active: Boolean;
}

export interface CreateBudgetDTO {
  initialDate: string;
  finalDate: string;
  initialAmount: number;
}
