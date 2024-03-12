import { useEffect, useState } from "react";
import Axios from "axios";
import { backend_address } from "../urls";
import { black, gray, green, red, white } from "../general/colors";
import { currency } from "../general/formats";
import DataTable from "../components/Table";

function SalesOrders() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const styles = {
    cursorNotAllowed: {
      cursor: 'not-allowed'
    }
  };

  const getData = () => {
    Axios.get(`${backend_address}/getSalesOrders`).then((res) => {
      setData(res.data);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    getData();
  }, []);

  const createColumns = (id, title) => {
    return { id, title };
  };

  const tableHeading = [
    createColumns(1, "Created Date"),
    createColumns(2, "Customer"),
    createColumns(3, "Total amount"),
    createColumns(4, "Delivery deadline"),
    createColumns(5, "Sales items"),
    createColumns(6, "Delivery"),
  ];

  const headers = tableHeading.map((item) => {
    return <th key={item.id}>{item.title}</th>;
  });

  const orders = data
    ?.sort((a, b) => b.id - a.id)
    .map((item) => {
      let totalAmount = item?.order_details.map((order) => {
        return order.product_details.reduce(
          (acc, curr) => (acc += curr.price),
          0
        );
      });

      let status = item.order_details.map((item) => {
        return item.status;
      });

      let customer = item.customer_details.map((customer) => {
        return customer.name;
      });

      let statusColor = {
        backgroundColor: status == "In stock" ? green : red,
        border: "1.5px solid white",
        color: white,
      };

      let deliveryColor = {
        backgroundColor: item.delivery == "Deliver" ? green : gray,
        border: "1.5px solid white",
        color: item.delivery == "Deliver" ? white : black,
        transition: "0.5s ease",
      };

      return (
        <tr key={item.id} style={styles.cursorNotAllowed}>
          <td>{item.id}</td>
          <td>{item.created_date}</td>
          <td>{customer}</td>
          <td>{currency.format(totalAmount)}</td>
          <td>{item.delivery_deadline}</td>
          <td style={statusColor}>{status}</td>
          <td style={deliveryColor}>{item.delivery}</td>
        </tr>
      );
    });

  return <DataTable headers={headers} isLoading={isLoading} list={orders} />;
}

export default SalesOrders;
