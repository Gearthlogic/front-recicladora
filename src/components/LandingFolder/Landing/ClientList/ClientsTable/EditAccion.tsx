import { useEffect, useState } from "react"
import { changeClientType } from "../../../../../services/api/changeClientType"


const EditAccion = ({ index, state }: any) => {

    const [estado, setEstado] = useState('')

    useEffect(() => {
        try {
            if (state === 'permanent') {
                setEstado('Permanente')
            } else {
                setEstado('Temporario')
            }
        } catch (error) {
            console.log(error)
        }
    }, [state])

    console.log(estado)

    const handleChangeState = (index: string) => {
        changeClientType(index)
            .then(res => console.log(res))
    }

    return (
        <div onClick={() => handleChangeState(index)}>
            <div>{estado}</div>
        </div>
    )
}

export default EditAccion