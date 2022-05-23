import { Button, Grid, Typography } from "@material-ui/core";
import { memo, useMemo } from "react";
import printJS from "print-js";

import { GetPendingTransactionsSummaryDTO } from "../../../../constants/dto/account.dto";
import useFetch from "../../../../hooks/useFetch";
import { useGlobalLoader } from "../../../../hooks/UseGlobalLoader";
import {
  postCancellingPayment,
  getPendingTransactions,
  getPaymentInfoFromTransaction,
} from "../../../../services/api/account";
import TransactionsSummary from "./TransactionsTable";
import Modal from "../CustomModal";
import OrderTable from "./OrderTable";

export interface PaymentFetchDetails {
  type: "account" | "transaction";
  id: number;
}

interface ClientPaymentModalProps {
  fetchDetails?: PaymentFetchDetails;
  onClose: Function;
  filterOrder: Function;
}

function ClientPaymentModal({
  fetchDetails,
  onClose,
  filterOrder,
}: ClientPaymentModalProps) {
  const { data } = useFetch<GetPendingTransactionsSummaryDTO>(
    useMemo(() => {
      if (fetchDetails) {
        const map = {
          account: getPendingTransactions(fetchDetails.id),
          transaction: getPaymentInfoFromTransaction(fetchDetails.id),
        };

        return map[fetchDetails?.type];
      }
    }, [fetchDetails?.id, fetchDetails?.type])
  );

  const onSubmit = useGlobalLoader(async () => {
    if (fetchDetails?.id) {
      await postCancellingPayment({ accountId: fetchDetails.id });
      filterOrder();
      onClose();
    }
  });

  return (
    <Modal open={!!fetchDetails} onClose={onClose}>
      <Grid id="payment-datail">
        <OrderTable orders={data?.orders} />
        <br />
        <TransactionsSummary transactions={data?.debits} />
        <br />
        <Typography variant="h6">Total: $ {data?.balance}</Typography>
      </Grid>

      <Grid marginY={2} container justifyContent="space-around">
        <Button
          variant="contained"
          color="secondary"
          onClick={() => printJS("payment-datail", "html")}
        >
          Imprimir
        </Button>
        {fetchDetails?.type === "account" && (
          <Button variant="contained" onClick={onSubmit}>
            Pagar
          </Button>
        )}
      </Grid>
    </Modal>
  );
}

export default memo(ClientPaymentModal);
