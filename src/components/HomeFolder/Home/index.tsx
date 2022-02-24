import { Button } from '@mui/material'
import { useEffect } from 'react';
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom';
import { Path } from '../../../constants/enums/path.enum';
import { RootStore } from '../../../redux';

const Home = () => {
    const user = useSelector<RootStore>(state  => state.auth.user);
    const history = useHistory();

    useEffect(() => {
        if(!user) {
            history.push(Path.login);
        }
    }, [user, history] )

    return (
        <div>
            <Button variant="contained">Contained</Button>
        </div>
    )
}

export default Home
