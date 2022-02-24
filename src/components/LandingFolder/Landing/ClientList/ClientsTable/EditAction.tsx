import { FaEdit } from 'react-icons/fa'
import { useHistory } from 'react-router-dom'
import { paths } from '../../../../../routes/paths'

const EditAction = ({ index }: any) => {

    const history = useHistory()

    return (
        <div>
            <FaEdit style={{ width: '30px', height: '20px' }} onClick={() => history.push(paths.editClient + index)} />
        </div>
    )
}

export default EditAction