import { Grid, Typography } from "@material-ui/core";
import moment from "moment";
import { GetCurrentOrderDTO } from "../../../../../constants/dto/order.dto";

import styles from "../style.module.css";

interface OrderTableProps {
  orders?: GetCurrentOrderDTO[];
}

function OrderTable({ orders }: OrderTableProps) {
  return (
    <Grid>
      <Typography variant="h6">Ordenes</Typography>
      {orders?.map(({ pickupDate, items, id }) => (
        <Grid key={id}>
          <Typography>
            Ordern #{id} - Fecha: {moment(pickupDate).format("DD-MM-YYYY")}
          </Typography>
          <table className={styles.SummaryTable}>
            <thead>
              <tr>
                <th> Pesaqje </th>
                <th> Merma </th>
                <th> Cantidad final </th>
                <th> Precio </th>
                <th> Total </th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td>
                    {item.quantity} {item.unit}{" "}
                  </td>
                  <td>{item.wastePercentage} %</td>
                  <td>
                    {item.finalQuantity} {item.unit}{" "}
                  </td>
                  <td>$ {item.price}</td>
                  <td>$ {item.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Grid>
      ))}
    </Grid>
  );
}

export default OrderTable;
