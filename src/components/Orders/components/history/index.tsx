import { useState, useEffect, memo } from 'react';
import { setMessage } from '../../../../redux/actions/message';
import { useDispatch } from 'react-redux';
import moment from 'moment';

import CurrentOrderstable from './components/table'
import { getOrders } from '../../../../services/api/orders';
import { OrderState } from '../../../../constants/enums/orderStates.enum';
import { startLoading, endLoading } from '../../../../redux/actions/loading/loading';
import transalations from '../../../../assets/translations.json';
import { ClientType } from '../../../../constants/enums/client.enum';
import AccordionCustom from '../../../common/Accordion/AccordionCustom';

import { Theme, useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';


interface OrdersData {
    orders: any[];
    client: any[];
    count: number;
}
const initialstate: OrdersData = {
    orders: [],
    client: [],
    count: 0
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const states: string[] = [
    'Created',
    'Controlling',
    'PendingToSetTemporaryClientPrice',
    'Closed',
];

const getStyles = (state: string, selectedStates: string[], theme: Theme) => {
    return {
        fontWeight:
            selectedStates.indexOf(state) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

const OrdersHistory = () => {
    const theme = useTheme();
    const dispatch = useDispatch();

    const [selectedStates, setsSelectedStates] = useState<string[]>([]);
    const [page, setPage] = useState(1);
    const [clientsList, setClientsList] = useState<OrdersData>(initialstate);

    useEffect(() => {
        dispatch(startLoading());
        getOrders({
            page,
            // pickupDate: moment().format("YYYY-MM-DD"),
            state: [OrderState.Created, OrderState.PendingToSetTemporaryClientPrice]
        })
            .then(res => {
                const data = res?.data.orders.map((client: any) => {
                    const typeFormat: ClientType = client.client.type
                    const stateFormat: ClientType = client.state
                    return {
                        type: transalations['es-ES'][typeFormat],
                        state: transalations['es-ES'][stateFormat],
                        alias: client.client.alias,
                        id: client.client.id,
                        payableAmount: client.payableAmount,
                        cellphone: client.client.cellphone,
                        email: client.client.email,
                        pickupDate: moment(client.pickupDate).format("DD-MM/YYYY")
                    }
                })
                setClientsList({ orders: data, client: [], count: res.data.count })
            })
            .catch(() => dispatch(setMessage({ action: "Error al cargar la información" }, 'error')))
            .finally(() => dispatch(endLoading()))

    }, [page])

    return (
        <div>
            <AccordionCustom text='Filtrar' >
                <div style={{ display: 'flex' }}>
                    <FormControl sx={{ m: 1, width: 300 }}>
                        <InputLabel id="state-selector">Estados</InputLabel>
                        <Select
                            labelId="state-selector"
                            id="demo-multiple-name"
                            multiple
                            value={['1', '2', '3']}
                            // onChange={handleChange}
                            input={<OutlinedInput label="Estados" />}
                            MenuProps={MenuProps}
                        >
                            {states.map((state: any) => {
                                const text: OrderState = state
                                console.log(text)
                                return (<MenuItem
                                    key={state}
                                    value={state}
                                    style={getStyles(state, selectedStates, theme)}
                                >
                                    {transalations['es-ES']['Iron']}
                                    {/* {state} */}
                                </MenuItem>)
                            })}
                        </Select>
                    </FormControl>
                </div>
            </AccordionCustom>

            <div>
                <CurrentOrderstable orders={clientsList.orders} />
            </div>
        </div>
    )
}

export default memo(OrdersHistory);