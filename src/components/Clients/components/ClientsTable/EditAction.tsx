import { FaEdit } from 'react-icons/fa'
import { useHistory } from 'react-router-dom'
import { Path } from '../../../../constants/enums/path.enum';

const EditAction = ({ id }: any) => {

    const history = useHistory()

    return (
        <div>
            <FaEdit style={{ width: '30px', height: '20px' }} 
            onClick={() => history.push(Path.editClient.replace(':id', id)  )} />
        </div>
    )
}

export default EditAction