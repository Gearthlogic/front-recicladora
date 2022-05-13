import { Button, Grid } from "@material-ui/core"
import { memo, ReactElement } from "react"

import { GetCurrentOrderDTO } from "../../../../constants/dto/order.dto";
import { OrderState } from "../../../../constants/enums/orderStates.enum";
import CreateOrder from './create';

interface CreatedOrderListHraderProps {
    setOrders: React.Dispatch<React.SetStateAction<GetCurrentOrderDTO[] | undefined>>,
    requestPort: Function,
    currentTab: OrderState
}

function CreatedOrderListHrader({currentTab, setOrders, requestPort }: CreatedOrderListHraderProps) {

    function currentTabHeaderFactory() {
        const contentMap :{ [key in OrderState]?: ReactElement} = {
            [OrderState.Created]: (
                <>
                    <CreateOrder setOrders={setOrders} />
                    <Button color="secondary" onClick={async () => await requestPort()}>
                        Conectar Balanza
                    </Button>
                </>
            )
        }

        return contentMap[currentTab];
    }

    return (
        <Grid container flexDirection="row" justifyContent="space-between" >
            {currentTabHeaderFactory()}
        </Grid>
    )
}

export default memo(CreatedOrderListHrader)