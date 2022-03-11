import moment from "moment";
import { useMemo } from "react";


import useFetch from "../../../hooks/useFetch";
import { OrderState } from "../../../constants/enums/orderStates.enum";
import { getOrders } from "../../../services/api/orders";
import Table from './components/table'

function ControllingOrderList() {
    const { data } = useFetch<{orders: any[]}>(useMemo(() => getOrders({
        pickupDate: moment().format("YYYY-MM-DD"),
        state: [OrderState.Controlling]
    }), []))
    debugger
    return (
        <Table orders={data?.orders} />
    )
}


export default ControllingOrderList;