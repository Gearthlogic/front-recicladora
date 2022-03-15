import { InfoOutlined, AccountBalanceOutlined } from '@mui/icons-material';
import { Button } from '@mui/material';
import { useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import { Path } from '../../../../constants/enums/path.enum';
import { useAddQueryParamData } from '../../../../hooks/useQueryParamData';

const EditAction = ({ id, alias }: any) => {

    const history = useHistory()

    const navigateEdit = useCallback(
        () => history.push(Path.editClient.replace(':id', id)),
        [id, history]
    );
    
    const navigateAccount = useAddQueryParamData({ id, alias }, Path.clientAccount);

    return (
        <>
            <Button onClick={navigateEdit} >
                <InfoOutlined />
            </Button>
            <Button onClick={navigateAccount} >
                <AccountBalanceOutlined />
            </Button>
        </>
    )
}

export default EditAction