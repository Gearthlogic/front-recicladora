import { Grid, Typography } from "@material-ui/core";
import moment from "moment";
import { memo } from "react";

import { CurrentAccountTransaction } from "../../../../../constants/dto/account.dto";
import styles from "../style.module.css";

interface OrderItemListProps {
  transactions?: CurrentAccountTransaction[];
}

function TransactionsSummary({ transactions }: OrderItemListProps) {
  return transactions?.length ? (
    <Grid>
      <Typography variant="h6">Adelantos</Typography>
      <table className={styles.SummaryTable}>
        <thead>
          <th> Fecha </th>
          <th> Monto </th>
        </thead>
        {transactions?.map((transaction) => (
          <tr key={transaction.transactionId}>
            <td>{moment(transaction.createdAt).format("DD-MM-YYYY")}</td>
            <td>$ {transaction.amount}</td>
          </tr>
        ))}
      </table>
    </Grid>
  ) : null;
}

export default memo(TransactionsSummary);
