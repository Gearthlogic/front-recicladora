import { useEffect, useState } from "react";

import Table from './components/Table';
import { getUsers } from '../../services/api/user';
import { useDispatch } from "react-redux";
import { endLoading, startLoading } from "../../redux/actions/loading/loading";
import { setMessage } from "../../redux/actions/message";
import { Role } from "../../constants/enums/role.enum";

export interface UserTableRow {
    id: number;
    username: string;
    roles: Role[];
}

function UsersList() {
    const [users, setUsers] = useState<UserTableRow[]>([]);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(startLoading())
        getUsers()
            .then(res => setUsers(res))
            .catch(error => setMessage({ action: error?.message }, 'error'))
            .finally(() => dispatch(endLoading()))
    }, [])

    return <Table rows={users} setRows={setUsers} />
}

export default UsersList;