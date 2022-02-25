import { changeClientState } from "../../../../services/api/clients"
import styles from './styles.module.css'

interface ChangeStateProps {
    id: number;
    active: Boolean;
    successCallback : () => void
}

const ChangeState = ({ id, active,successCallback }: ChangeStateProps) => {

    const handleChangeState = (id: number) => {
        try {
            changeClientState(id)
            successCallback();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div onClick={() => handleChangeState(id)} className={styles.activeBtn}>
            <div
                className={active ? `${styles.activo}` : `${styles.inactivo}`}
            >
                {active ? 'Activo' : 'Inactivo'}
            </div>
        </div>
    )
}

export default ChangeState