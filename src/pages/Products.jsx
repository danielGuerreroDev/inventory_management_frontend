import { useEffect, useState } from "react";
import Axios from "axios";
import { backend_address } from "../urls";
import DataTable from "../components/Table";

function Products() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getData = () => {
    Axios.get(`${backend_address}/getProducts`).then((res) => {
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
    createColumns(1, "Title"),
    createColumns(2, "Category"),
    createColumns(3, "Brand"),
    createColumns(4, "Rating"),
    createColumns(5, "Discount"),
    createColumns(6, "Price"),
    createColumns(7, "Stock"),
  ];

  const productsList = data?.map((item) => {
    return (
      <tr key={item.id}>
        <td>{item.id}</td>
        <td>{item.title}</td>
        <td>{item.category}</td>
        <td>{item.brand}</td>
        <td>{item.rating}</td>
        <td>{item.discountPercentage}</td>
        <td>{item.price}</td>
        <td>{item.stock}</td>
      </tr>
    );
  });

  const headers = tableHeading.map((item) => {
    return <th key={item.id}>{item.title}</th>;
  });

  return (
    <DataTable headers={headers} isLoading={isLoading} list={productsList} />
  );
}

export default Products;
