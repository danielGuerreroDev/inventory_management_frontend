import { useEffect, useState } from "react";
import Axios from "axios";
import { backend_address } from "../urls";
import { currency } from "../general/formats";
import DataTable from "../components/Table";
import { black, green, red, white } from "../general/colors";
import ProductDetails from "../components/ProductDetails";

function Products() {
  const [data, setData] = useState([]);
  const [disabled, setDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(1);

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
    createColumns(5, "Discount %"),
    createColumns(6, "Price"),
    createColumns(7, "Stock"),
  ];

  const headers = tableHeading.map((item) => {
    return <th key={item.id}>{item.title}</th>;
  });

  const enableEditing = () => {
    setDisabled(false);
  }

  const openProductDetail = (id) => {
    setSelectedProduct(id);
    setIsOpen(!isOpen);
  };

  const cancelEditing = (x) => {
    setDisabled(x);
  };

  const closeProductDetail = () => {
    setDisabled(true);
    setIsOpen(!isOpen);
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
        <tr key={item.id} onClick={() => openProductDetail(item.id)}>
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
      <ProductDetails
        cancelEditing={cancelEditing}
        closeProductDetail={closeProductDetail}
        disabled={disabled}
        enableEditing={enableEditing}
        getData={getData}
        isOpen={isOpen}
        selectedProduct={selectedProduct}
        setDisabled={setDisabled}
      />
    </>
  );
}

export default Products;
