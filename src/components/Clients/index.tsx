import { useEffect, useState } from "react"
import { getClients } from '../../services/api/clients';
import ClientsTable from "./components/ClientsTable"
import styles from "./styles.module.css"


const ClientList = () => {

    const [data, setData] = useState([])

    useEffect(() => {
        getClients().then(res => setData(res.data))
    }, [])
    
    return (
        <div className={styles.clientTableMain}>
            <ClientsTable rows={data} />
        </div>
    )
}

export default ClientList