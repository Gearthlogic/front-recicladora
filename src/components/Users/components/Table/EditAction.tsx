import { EditOutlined, DeleteOutlined } from '@mui/icons-material';
import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';

import { Path } from '../../../../constants/enums/path.enum';
import { endLoading, startLoading } from '../../../../redux/actions/loading/loading';
import { setMessage } from '../../../../redux/actions/message';
import { deleteUser } from '../../../../services/api/user';
import { useAddQueryParamData } from '../../../../hooks/useQueryParamData';
import { UserTableRow } from '../..';
import { memo } from 'react';
import { GridRowData } from '@material-ui/data-grid';

interface UserActionsProps {
    data: GridRowData;
	setRows: React.Dispatch<React.SetStateAction<UserTableRow[]>>
}

const UserActions = ({ data, setRows }: UserActionsProps) => {
    const dispatch = useDispatch();

    async function onDeleteUser() {
        dispatch(startLoading());
        try {
            await deleteUser(data.id);
            setRows((prev: UserTableRow[]) => prev.filter(row => row.id !== data.id))
        } catch (error) {
            dispatch(setMessage({ message: "Hubo un error" }))
        } finally {
            dispatch(endLoading());
        }
    }

    const callnack = useAddQueryParamData<GridRowData>(data, Path.editUser)

    return (
        <>
            <Button onClick={callnack} >
                <EditOutlined />
            </Button>
            <Button onClick={onDeleteUser} >
                <DeleteOutlined />
            </Button>
        </>
    )
}

export default memo(UserActions)