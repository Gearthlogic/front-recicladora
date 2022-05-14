import { TransactionState } from "../enums/transactionStates.enum";
import { TransactionType } from "../enums/transactionTypes.enum";
import { GetCurrentOrderDTO } from "./order.dto";

export interface PositiveBalanceDTO {
    accountId: number;
    balance: number;
    client: {
        alias: string
    };
    lastTransactionDate: Date;
}


export interface PostPaymentDTO {
    accountId : number;
}

export interface GetPendingTransactionsSummaryDTO {
    balance: number;
    orders: GetCurrentOrderDTO[];
    debits: CurrentAccountTransaction[];
}

export interface CurrentAccountTransaction {
    accountId: number;
    amount: number;
    cancellingPaymentId?: number;
    createdAt: Date;
    order?: GetCurrentOrderDTO;
    state: TransactionState;
    transactionId: number;
    type: TransactionType;
}
