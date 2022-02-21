import { useEffect, useState } from "react"
import { getAllClients } from "../../../../services/api/getAllClients"
import ClientsTable from "./ClientsTable"


const ClientList = () => {

    const [data, setData] = useState([])

    useEffect(() => {
        getAllClients()
            .then(res => setData(res.data))
    }, [])

    return (
        <div>
            <ClientsTable rows={data} />
        </div>
    )
}

export default ClientList