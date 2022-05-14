import { Typography } from '@material-ui/core';
import { memo, useMemo } from 'react';
import { GetPendingTransactionsSummaryDTO } from '../../../constants/dto/account.dto';
import useFetch from '../../../hooks/useFetch';
import { postCancellingPayment, getPendingTransactions } from '../../../services/api/account';
import TransactionsSummary from '../CurrentAccounts/TransactionsSummary';
import OrderSummary from '../Orders/OrderSummary';
import Modal from './CustomModal';

interface ClientPaymentModalProps {
    accountId?: number;
    onClose: Function
}

function ClientPaymentModal({ accountId, onClose }: ClientPaymentModalProps) {

    const { data } = useFetch<GetPendingTransactionsSummaryDTO>(
        useMemo(() => accountId ? getPendingTransactions(accountId) : undefined, [accountId])
    );

    return (
        <Modal open={!!accountId} onClose={onClose} >
            <Typography variant="h6">
                Ordenes
            </Typography>
            {data?.orders.map(({ payableAmount, items }) => (
                <OrderSummary total={payableAmount} items={items} />
            ))}
            {data?.debits && (
                <>
                    <Typography variant="h6">
                        Adelantos
                    </Typography>
                    <TransactionsSummary transactions={data.debits} />
                </>
            )}
        </Modal>
    )
}


export default memo(ClientPaymentModal)