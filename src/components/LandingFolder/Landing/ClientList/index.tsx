import { useEffect, useState } from "react"
import { getAllClients } from "../../../../services/api/getAllClients"
import ClientsTable from "./ClientsTable"
import styles from "./styles.module.css"


const ClientList = () => {

    const [data, setData] = useState([])

    useEffect(() => {
        getAllClients()
            .then(res => setData(res.data))
    }, [])


    return (
        <div className={styles.clientTableMain}>
            <ClientsTable rows={data} />
        </div>
    )
}

export default ClientList