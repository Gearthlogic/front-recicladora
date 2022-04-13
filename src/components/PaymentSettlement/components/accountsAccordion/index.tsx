import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@material-ui/core";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import moment from 'moment';
import {  memo, SyntheticEvent } from "react";

import { PositiveBalanceDTO } from '../../../../constants/dto/account.dto';

function AccountAccordion({ client, lastTransactionDate }: PositiveBalanceDTO) {
   // const [transactions, settransactions] = useState([]);

    function handlechange(
        event: SyntheticEvent<Element, Event>, isExpanded: boolean
    ) {
        console.log("IsExpandaed", isExpanded);
    }

    return (
        <Accordion onChange={handlechange}  >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6"  >
                    {moment(lastTransactionDate).format("DD-MM-YYYY")} - {client.alias}
                </Typography>
            </AccordionSummary>
            <AccordionDetails>

            </AccordionDetails>
        </Accordion>
    )
}

export default memo(AccountAccordion)