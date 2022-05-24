import { Button, Grid, Typography } from "@material-ui/core";
import { memo, useCallback, useMemo } from "react";
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
import { inputPaymentActionCreator } from "../../../../redux/actions/active-budget";

export interface PaymentFetchDetails {
  type: "account" | "transaction";
  id: number;
}

interface ClientPaymentModalProps {
  fetchDetails?: PaymentFetchDetails;
  onClose: () => void;
  callback: Function;
}

const promiseaMap = {
  account: getPendingTransactions,
  transaction: getPaymentInfoFromTransaction,
};

function ClientPaymentModal({
  fetchDetails,
  onClose,
  callback,
}: ClientPaymentModalProps) {
  const { data } = useFetch<GetPendingTransactionsSummaryDTO>(
    useCallback(() => {
      if (fetchDetails) {
        return promiseaMap[fetchDetails.type](fetchDetails.id);
      }
    }, [fetchDetails])
  );

  const onSubmit = useGlobalLoader(async (dispatch) => {
    if (fetchDetails?.id) {
      const res = await postCancellingPayment({ accountId: fetchDetails.id });

      dispatch(inputPaymentActionCreator(res.data.total));
      callback();
      onClose();
    }
  });

  return (
    <Modal
      dialogProps={{
        open: !!fetchDetails,
        onClose,
      }}
    >
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
