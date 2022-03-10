import React from 'react'

import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion } from '@mui/material';

interface Props {
  children?: any;
  text?: string;
  width?: string;
}

const AccordionCustom = ({
  width = 'fit-content',
  text = 'Titulo',
  children = 'Contenido'
}: Props) => {


  return (
    <div style={{ width: width }}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>{text}</Typography>
        </AccordionSummary>

        <AccordionDetails>
          {children}
        </AccordionDetails>
      </Accordion>
    </div>
  )
}

export default AccordionCustom