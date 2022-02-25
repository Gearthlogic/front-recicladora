import { FaEdit } from 'react-icons/fa'
import { useHistory } from 'react-router-dom'
import { Path } from '../../../constants/enums/path.enum';

const EditAction = ({ index }: any) => {

    const history = useHistory()

    return (
        <div>
            <FaEdit style={{ width: '30px', height: '20px' }} onClick={() => history.push(Path.editClient + index)} />
        </div>
    )
}

export default EditAction