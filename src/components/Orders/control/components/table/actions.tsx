import { InfoOutlined } from '@mui/icons-material';
import { Button } from '@mui/material';
import { memo } from 'react';


const ViewOrderBtn = ({ data }: any) => {


    return (
        <Button onClick={() => null} >
            <InfoOutlined />
        </Button>
    )
}

export default memo( ViewOrderBtn)