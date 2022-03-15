import { useState, useEffect, memo } from 'react';
import { setMessage } from '../../../../redux/actions/message';
import { useDispatch } from 'react-redux';
import moment from 'moment';


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
import { Button } from '@mui/material';
import HistoryOrdersTable from './components/HistoryOrdersTable';


interface OrdersData {
    orders: any[];
    count: number;
}
const initialstate: OrdersData = {
    orders: [],
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

    const [selectedStates, setSelectedStates] = useState<OrderState[]>([]);
    const [pageToShow, setPageToShow] = useState<number>(0)
    const [pageSize, setPageSize] = useState<number>(20)

    const [page, setPage] = useState(1);
    const [clientsList, setClientsList] = useState<OrdersData>(initialstate);

    const [refreshFilter, setRefreshFilter] = useState<boolean>(true)
    const [toggleFilterAccordion, setToggleFilterAccordion] = useState<boolean>(false)

    useEffect(() => {
        dispatch(startLoading());
        getOrders({
            page,
            state: selectedStates,
        })
            .then(res => {
                const data = res?.data.orders.map((order: any) => {
                    const typeFormat: ClientType = order.client.type
                    const stateFormat: ClientType = order.state

                    return {
                        type: transalations['es-ES'][typeFormat],
                        state: transalations['es-ES'][stateFormat],
                        alias: order.client.alias,
                        id: order.id,
                        payableAmount: order.payableAmount,
                        cellphone: order.client.cellphone,
                        email: order.client.email,
                        pickupDate: moment(order.pickupDate).format("DD-MM-YYYY")
                    }
                })
                setClientsList({ orders: data, count: res.data.count })
            })
            .catch(() => dispatch(setMessage({ action: "Error al cargar la información" }, 'error')))
            .finally(() => dispatch(endLoading()))

    }, [page, refreshFilter])

    const handleChange = (event: SelectChangeEvent<typeof selectedStates>) => {
        const { target: { value } } = event;
        setSelectedStates(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') as OrderState[] : value,
        );
    };

    const handleFilterSubmit = () => {
        setRefreshFilter(!refreshFilter)
        setToggleFilterAccordion(false)
    }

    return (
        <div>
            <AccordionCustom
                
                text='Filtrar'
                expanded={toggleFilterAccordion}
                onClick={() => setToggleFilterAccordion(!toggleFilterAccordion)}
            >
                <div style={{ display: 'flex', width: 'auto', alignItems: 'center' }}>
                    <FormControl sx={{ m: 1, width: 200 }}>
                        <InputLabel id="state-selector">Estados</InputLabel>
                        <Select
                            labelId="state-selector"
                            id="demo-multiple-name"
                            multiple
                            value={selectedStates}
                            onChange={handleChange}
                            input={<OutlinedInput label="Estados" />}
                            MenuProps={MenuProps}
                        >
                            {states.map((state: any) => {
                                const stateFormat: OrderState = state 
                                return (
                                    <MenuItem
                                        key={state}
                                        value={state}
                                        style={getStyles(state, selectedStates, theme)}
                                    >
                                        {transalations['es-ES'][stateFormat]}
                                    </MenuItem>)
                            })}
                        </Select>
                    </FormControl>

                    <div style={{ maxHeight: '30px' }}>
                        <Button variant='outlined' onClick={handleFilterSubmit}>Filtrar Lista</Button>
                    </div>
                </div>
            </AccordionCustom>

            <div>
                <HistoryOrdersTable
                    orders={clientsList.orders}
                    page={pageToShow}
                    pageSize={pageSize}
                    onPageSizeChange={(newPage: number) => setPageSize(newPage)}
                    onPageChange={(e: number) => {
                        setPageToShow(e)
                    }}
                />
            </div>
        </div>
    )
}

export default memo(OrdersHistory);