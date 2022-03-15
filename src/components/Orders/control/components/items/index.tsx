import { Grid, Button } from "@material-ui/core";
import { Dispatch, memo, SetStateAction } from "react";
import { useDispatch } from "react-redux";

import { ControlOrderItemsDTO } from "../../../../../constants/dto/order.dto";
import { endLoading, startLoading } from "../../../../../redux/actions/loading/loading";
import { setMessage } from "../../../../../redux/actions/message";
import { endControlling } from "../../../../../services/api/orders";
import Item from './item';

interface ControlOrderItemsFormProps {
    id: number;
    items: ControlOrderItemsDTO[],
    setData: Dispatch<SetStateAction<any[] | undefined>>
}

const ControlOrderItemsForm = ({items, id, setData} : ControlOrderItemsFormProps ) => {
    const dispatch = useDispatch();

    async function submitEndContrlling () {
        try {
            dispatch(startLoading());
            await endControlling(id)
            setData(prev => prev?.filter(order => order.id !== id))
            dispatch(setMessage({ message: "Actualziación axitosa" }));
        } catch (error) {
            dispatch(setMessage({ message: "error" }, "error" ));
        }finally{
            dispatch(endLoading());
        }
    }

    return (
        <Grid container>
           {items.map(item => <Item key={item.id} {...item} />) }
           <Grid marginY={4} container justifyContent="center">
               <Button variant="contained" onClick={submitEndContrlling} > Terminar control </Button>
           </Grid>
        </Grid>
    );
}

export default memo( ControlOrderItemsForm);