import { AddLiquidityDTO, Budget, CreateBudgetDTO } from "../../constants/dto/budget.dto";
import { privateAxiosInstance } from "../axios";

export const getBudgets = ()  =>{
    return privateAxiosInstance.get<Budget[]>('/budget')
}

export const getActiveBudget = ()  =>{
    return privateAxiosInstance.get<Budget>('/budget/active')
}

export const postBudget = (data: CreateBudgetDTO)  =>{
    return privateAxiosInstance.post<Budget>('/budget', data)
}

export const addLiquidityToBudget = (data: AddLiquidityDTO)  =>{
    return privateAxiosInstance.patch<Budget>('/budget/actions/add_liquidity', data)
}