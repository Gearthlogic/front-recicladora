import { InfoOutlined } from '@mui/icons-material';
import { Button } from '@mui/material';
import { useHistory } from 'react-router-dom';

import { Path } from '../../../../constants/enums/path.enum';

const ViewOrder = ({ id }: any) => {

    const history = useHistory()

    return (
        <Button onClick={() => history.push(Path.viewOrder.replace(':id', id))} >
            <InfoOutlined />
        </Button>
    )
}

export default ViewOrder