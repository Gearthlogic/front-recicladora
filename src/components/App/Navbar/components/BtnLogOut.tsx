import { Button } from '@material-ui/core'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { actionLogOut } from '../../../../redux/actions';
import { Path } from '../../../../constants/enums/path.enum';

const BtnLogOut = () => {

   const dispatch = useDispatch();
   const history = useHistory();

   const handleLogOut = () => {
      dispatch(actionLogOut(() => {
         history.push(Path.index)
         localStorage.clear();
      }));
   };

   return (
      <div>
         <Button
            variant='contained'
            onClick={handleLogOut}
         >
            Cerrar Sesión
         </Button>
      </div>
   )
}

export default BtnLogOut