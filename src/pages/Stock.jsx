import { useEffect, useState } from "react";
import Axios from "axios";
import { backend_address } from "../urls";
import { currency } from "../general/formats";
import DataTable from "../components/Table";
import Modal from "react-bootstrap/Modal";
import { black, green, red, white } from "../general/colors";

function Products() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  const getData = () => {
    Axios.get(`${backend_address}/getProducts`).then((res) => {
      setData(res.data);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    const ids = [29, 28, 27, 26, 25, 23, 22, 21, 19, 15, 14, 13, 9, 8 ,6, 5];

    const simulation = (id) => {
      setTimeout(() => {
        Axios.put(`${backend_address}/product/${id}`, {
          id: id,
          stock: Math.floor(Math.random(1, 30) * 30),
        })
          .then(() => {
            getData();
          })
          .catch((err) => {
            console.log(err.message);
          });
      }, 800);
    };

    ids.forEach((v) => simulation(v));
  }, [isLoading]);

  const createColumns = (id, title) => {
    return { id, title };
  };

  const tableHeading = [
    createColumns(1, "Title"),
    createColumns(2, "Category"),
    createColumns(3, "Brand"),
    createColumns(4, "Rating"),
    createColumns(5, "Discount %"),
    createColumns(6, "Price"),
    createColumns(7, "Stock"),
  ];

  const headers = tableHeading.map((item) => {
    return <th key={item.id}>{item.title}</th>;
  });

  const productDetail = () => {
    return setIsOpen(!isOpen);
  };

  const products = data
    ?.sort((a, b) => b.id - a.id)
    .map((item) => {
      let changeAnimation = {
        backgroundColor: item.stock < 10 ? red : green,
        border: "1.5px solid white",
        color: item.stock < 10 ? white : black,
        transition: "0.5s ease",
      }

      return (
        <tr key={item.id} onClick={productDetail}>
          <td>{item.id}</td>
          <td>{item.title}</td>
          <td>{item.category}</td>
          <td>{item.brand}</td>
          <td>{item.rating}</td>
          <td>{item.discountPercentage}</td>
          <td>{currency.format(item.price)}</td>
          <td style={changeAnimation}>{item.stock}</td>
        </tr>
      );
    });

  return (
    <>
      <DataTable headers={headers} isLoading={isLoading} list={products} />
      <Modal onHide={productDetail} show={isOpen} size="lg">
        <h1>Hola</h1>
      </Modal>
    </>
  );
}

export default Products;
