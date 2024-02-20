import { useEffect, useState } from "react";
import Axios from "axios";
import { backend_address } from "../urls";
import { black, green, red, white } from "../general/colors";
import { currency } from "../general/formats";
import DataTable from "../components/Table";
import ItemDetails from "../components/ProductDetails";
import PageItem from "react-bootstrap/esm/PageItem";
import Paging from "../components/Pagination";

function Products() {
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const [disabled, setDisabled] = useState(true);
  const [endLimit, setEndLimit] = useState(10);
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(1);
  const [startLimit, setStartLimit] = useState(0);

  const getData = () => {
    Axios.get(`${backend_address}/getProducts`).then((res) => {
      setData(res.data);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    getData();
  }, []);

  const cancelEditing = (param) => {
    setDisabled(param);
  };

  const changePage = (i) => {
    setCurrentPage(i + 1);
    setStartLimit(i == 0 ? i : i * 10);
    setEndLimit(10 * (i + 1));
  };

  const closeProductDetail = () => {
    setDisabled(true);
    setIsOpen(!isOpen);
  };

  const createColumns = (id, title) => {
    return { id, title };
  };

  const enableEditing = () => {
    setDisabled(false);
  };

  const first = () => {
    setCurrentPage(1);
    setStartLimit(0);
    setEndLimit(10);
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

  const last = () => {
    setCurrentPage(pages.length);
    setStartLimit((pages.length - 1) * 10);
    setEndLimit(pages.length * 10);
  };

  const next = () => {
    setCurrentPage(currentPage + 1);
    setStartLimit(currentPage == 0 ? currentPage : currentPage * 10);
    setEndLimit(10 * (currentPage + 1));
  };

  const openProductDetail = (id) => {
    setSelectedProduct(id);
    setIsOpen(!isOpen);
  };

  const pagesDivision = Math.ceil(data?.length / 10);

  const pages = Array.from({ length: pagesDivision }).map((v, i) => {
    return (
      <PageItem
        active={currentPage == i + 1}
        key={i}
        onClick={() => changePage(i)}
      >
        {i + 1}
      </PageItem>
    );
  });

  const prev = () => {
    setCurrentPage(currentPage - 1);
    setStartLimit(currentPage - 1 == 0 ? currentPage : (currentPage - 2) * 10);
    setEndLimit(10 * (currentPage - 1));
  };

  const products = data
    ?.sort((a, b) => b.id - a.id)
    .map((item) => {
      let changeAnimation = {
        backgroundColor: item.stock < 10 ? red : green,
        border: "1.5px solid white",
        color: item.stock < 10 ? white : black,
        transition: "0.5s ease",
      };

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
    })
    .slice(startLimit, endLimit);

  return (
    <>
      <DataTable headers={headers} isLoading={isLoading} list={products} />
      <Paging
        currentPage={currentPage}
        first={first}
        last={last}
        next={next}
        pages={pages}
        prev={prev}
      />
      <ItemDetails
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
