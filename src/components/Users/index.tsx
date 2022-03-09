import { useEffect, useState } from "react";

import Table from './components/Table';
import {getUsers} from '../../services/api/user';
import { useDispatch } from "react-redux";
import { endLoading, startLoading } from "../../redux/actions/loading/loading";
import { setMessage } from "../../redux/actions/message";

function UsersList() {
    const [users, setUsers] = useState([]);
    const dispatch = useDispatch();

    useEffect(() =>{
        dispatch(startLoading())
        getUsers()
            .then(res => setUsers(res))
            .catch(error=> setMessage({message: error?.message}))
            .finally(()=> dispatch(endLoading()))
    }, [])

    console.log('users',users)
    return(
        <Table rows={users}  />
    )
}

export default  UsersList;