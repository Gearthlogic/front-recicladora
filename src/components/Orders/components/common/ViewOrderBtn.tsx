import { InfoOutlined } from '@mui/icons-material';
import { Button } from '@mui/material';

import { Path } from '../../../../constants/enums/path.enum';
import { useAddQueryParamData } from '../../../../hooks/useQueryParamData';

const ViewOrderBtn = ({ data }: any) => {

    const navigateview = useAddQueryParamData(data, Path.viewOrder)

    return (
        <Button onClick={navigateview} >
            <InfoOutlined />
        </Button>
    )
}

export default ViewOrderBtn