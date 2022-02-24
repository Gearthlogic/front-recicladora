import { Button } from '@mui/material'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { Path } from '../../../constants/enums/path.enum';
import { RootStore } from '../../../redux';

const Landing = () => {
    const user = useSelector<RootStore>(state => state.auth.user);

    return (!user ? <Redirect to={Path.login} /> :
        <div>
            <Button variant="contained">Contained</Button>
        </div>
    )
}

export default Landing
