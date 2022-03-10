import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useExctractQueryParamData } from "../../hooks/useQueryParamData";
import { endLoading, startLoading } from "../../redux/actions/loading/loading";
import { getAccount } from "../../services/api/account";

function ClientAccount() {
    const [account, setAccount] = useState()
    const data = useExctractQueryParamData();

    const dispatch = useDispatch();
    console.log(account)

    useEffect(() => {
        dispatch(startLoading());
        getAccount(data.id).then(response => setAccount(response))
            .catch(console.log)
            .finally(() => dispatch(endLoading()));
    }, [data.id, dispatch])

    return (
        <div>

            cuenta
        </div>
    )
}


export default ClientAccount;