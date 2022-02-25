import { useEffect, useState } from "react"
import { changeClientState } from "../../../services/api/clients"
import styles from './styles.module.css'


const ChangeState = ({ index, state }: any) => {

    const [estado, setEstado] = useState('')

    useEffect(() => {
        try {
            if (state) {
                setEstado('Activo')
            } else {
                setEstado('Inactivo')
            }
        } catch (error) {
            console.log(error)
        }
    }, [state])


    const handleChangeState = (index: string) => {
        changeClientState(index)
    }

    return (
        <div onClick={() => handleChangeState(index)} className={styles.activeBtn}>
            <div className={estado === 'Activo' ? `${styles.activo}` : `${styles.inactivo}`}>{estado}</div>
        </div>
    )
}

export default ChangeState