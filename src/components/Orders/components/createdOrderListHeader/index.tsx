import { Button, Grid } from "@material-ui/core"
import { memo } from "react"

import { GetCurrentOrderDTO } from "../../../../constants/dto/order.dto";
import { useSerialPort } from "../../../../hooks/useSerialPort";
import CreateOrder from './create';

interface CreatedOrderListHraderProps {
    setOrders: React.Dispatch<React.SetStateAction<GetCurrentOrderDTO[] | undefined>>
}

function CreatedOrderListHrader({ setOrders }: CreatedOrderListHraderProps) {
    const { requestPort } = useSerialPort();

    return (
        <Grid container flexDirection="row" justifyContent="space-between" >
            <CreateOrder setOrders={setOrders} />
            <Button color="secondary" onClick={requestPort}>
                Conectar Balanza
            </Button>
        </Grid>
    )
}

export default memo(CreatedOrderListHrader)