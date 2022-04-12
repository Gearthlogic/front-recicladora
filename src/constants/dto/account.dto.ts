import { number } from "yup"


export interface PositiveBalanceDTO {
    accountId: number;
    balance: number;
    client: {
        alias: string
    };
    lastTransactionDate: Date;
}