import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { endLoading, startLoading } from '../../redux/actions/loading/loading';
import { setMessage } from '../../redux/actions/message';

import { getPositiveBalanceAccounts } from '../../services/api/account';
import { PositiveBalanceDTO } from '../../constants/dto/account.dto';
import AccountAccordion from './components/accountsAccordion';

function PaymentSettlement() {
    const [accounts, setAccounts] = useState<PositiveBalanceDTO[]>([]);

    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
            try {
                dispatch(startLoading())
                const data = await getPositiveBalanceAccounts();

                setAccounts(data);
            } catch (error) {
                dispatch(setMessage({ message: "Error" }))
            } finally {
                dispatch(endLoading())
            }
        })();
    }, [])

    return (
        <div>
            {accounts.map(account => (
                <AccountAccordion
                    key={account.accountId}
                    {...account}
                />
            ))}
        </div>
    )
}

export default PaymentSettlement;

