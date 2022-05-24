import { useState } from "react";
import LoadingButton from '@mui/lab/LoadingButton';
import { changeClientState } from "../../../../services/api/clients"

interface ChangeStateProps {
    id: number;
    active: Boolean;
}

const ChangeState = ({ id, active }: ChangeStateProps) => {
    const [loading, setLoading] = useState(false)
    const [isActive, setIsActive] = useState(active)

    const handleChangeState = async (id: number) => {
        try {
            setLoading(true);
            await changeClientState(id);
            setIsActive(prev => !prev);
        } catch (error) {
        } finally {
            setLoading(false);
        }
    }

    return (
        <LoadingButton
            variant="contained"
            color={isActive ? 'success' : 'error' }
            loading={loading}
            fullWidth
            onClick={() => handleChangeState(id)}
        >
            {isActive ? 'Activo' : 'Inactivo'}
        </LoadingButton>
    )
}

export default ChangeState