import { useMemo } from 'react';
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom';

import { Path } from '../../../constants/enums/path.enum';
import { Role } from '../../../constants/enums/role.enum';
import { User } from '../../../constants/types/user.type';
import { RootStore } from '../../../redux';

const Landing = () => {
    const user = useSelector<RootStore>(state => state.auth.user) as User;

    const redirectPath = useMemo(() => {
        if (!user) return Path.login;

        if (user.roles.some(role => role === Role.Admin))
            return Path.clientList;

        if (user.roles.some(role => role === Role.Purchaser))
            return Path.orderList;
        
        return Path.clientList;
    }, [user])

    return <Redirect to={redirectPath} />
}

export default Landing
