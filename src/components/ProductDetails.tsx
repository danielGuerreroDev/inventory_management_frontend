import React, { useEffect, useMemo, useState } from "react";
import Axios from "axios";
import { backend_address } from "../urls";
import Card from "react-bootstrap/Card";
import CardBody from "react-bootstrap/CardBody";
import CardImg from "react-bootstrap/CardImg";
import CardTitle from "react-bootstrap/CardTitle";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import DropdownButton from "react-bootstrap/DropdownButton";
import DropdownItem from "react-bootstrap/DropdownItem";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import FormGroup from "react-bootstrap/FormGroup";
import FormLabel from "react-bootstrap/FormLabel";
import FormSelect from "react-bootstrap/FormSelect";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Toast from "react-bootstrap/Toast";
import ToastBody from "react-bootstrap/ToastBody";
import ToastContainer from "react-bootstrap/ToastContainer";

interface props {
  closeProductDetail: () => {};
  disabled: boolean;
  enableEditing: () => {};
  getData: () => {};
  isOpen: boolean;
  selectedProduct: number;
  setDisabled: (param) => {};
}

function ItemDetails({
  closeProductDetail,
  disabled,
  enableEditing,
  getData,
  isOpen,
  selectedProduct,
  setDisabled,
}: props) {
  const [brands, setBrands] = useState<any>(null);
  const [categories, setCategories] = useState<any>(null);
  const [clonedDataSingleProduct, setClonedDataSingleProduct] = useState<any>(
    {}
  );
  const [dataSingleProduct, setDataSingleProduct] = useState<any>({});
  const [description, setDescription] = useState<string>("");
  const [discountPercentage, setDiscountPercentage] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);
  const [rating, setRating] = useState<number>(0);
  const [selectedBrand, setSelectedBrand] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [stock, setStock] = useState<number>(0);
  const [showNotification, setShowNotification] = useState<boolean>(false);

  const styles = {
    actions: {
      margin: "5px 0px 5px 0px",
      padding: "0px",
    },
    divActions: {
      padding: "0px",
    },
    form: {
      width: "100%",
    },
    mainContainer: {
      paddingBottom: "30.33px",
    },
  };

  const getBrands = () => {
    Axios.get(`${backend_address}/getBrands`).then((res) => {
      setBrands(res.data);
    });
  };

  const getCategories = () => {
    Axios.get(`${backend_address}/getCategories`).then((res) => {
      setCategories(res.data);
    });
  };

  const getDataSingleProduct = () => {
    Axios.get(`${backend_address}/getProduct/${selectedProduct}`).then(
      (res) => {
        setDataSingleProduct(res.data);
      }
    );
  };

  useMemo(() => {
    getBrands();
    getCategories();
  }, []);

  useEffect(() => {
    getDataSingleProduct();
  }, [selectedProduct]);

  const brandsMapped = brands?.map((brand) => {
    if (brand.name != dataSingleProduct?.brand) {
      return (
        <option key={brand.id} value={brand.name}>
          {brand.name}
        </option>
      );
    }
  });

  const categoriesMapped = categories?.map((category) => {
    if (category.name != dataSingleProduct?.category) {
      return (
        <option key={category.id} value={category.name}>
          {category.name}
        </option>
      );
    }
  });

  const CancelBtn = () => {
    return <DropdownItem onClick={handleOnCancel}>Cancel</DropdownItem>;
  };

  const closeModal = () => {
    closeProductDetail();
    setClonedDataSingleProduct({});
    setDescription("");
    setDiscountPercentage(0);
    setPrice(0);
    setRating(0);
    setSelectedBrand("");
    setSelectedCategory("");
    setStock(0);
  };

  const handleBrand = (event) => {
    const { brand, ...rest } = clonedDataSingleProduct
      ? clonedDataSingleProduct
      : dataSingleProduct;
    const dataEdited = { brand: event.target.value, ...rest };
    setClonedDataSingleProduct(dataEdited);
    setSelectedBrand(event.target.value);
  };

  const handleCategory = (event) => {
    const { category, ...rest } = clonedDataSingleProduct
      ? clonedDataSingleProduct
      : dataSingleProduct;
    const dataEdited = { category: event.target.value, ...rest };
    setClonedDataSingleProduct(dataEdited);
    setSelectedCategory(event.target.value);
  };

  const handleDescription = (event) => {
    const { description, ...rest } = clonedDataSingleProduct
      ? clonedDataSingleProduct
      : dataSingleProduct;
    const dataEdited = { description: event.target.value, ...rest };
    setClonedDataSingleProduct(dataEdited);
    setDescription(event.target.value);
  };

  const handleDiscountPercentage = (event) => {
    const { discountPercentage, ...rest } = clonedDataSingleProduct
      ? clonedDataSingleProduct
      : dataSingleProduct;
    const dataEdited = { discountPercentage: event.target.value, ...rest };
    setClonedDataSingleProduct(dataEdited);
    setDiscountPercentage(event.target.value);
  };

  const handlePrice = (event) => {
    const { price, ...rest } = clonedDataSingleProduct
      ? clonedDataSingleProduct
      : dataSingleProduct;
    const dataEdited = { price: event.target.value, ...rest };
    setClonedDataSingleProduct(dataEdited);
    setPrice(event.target.value);
  };

  const handleRating = (event) => {
    const { rating, ...rest } = clonedDataSingleProduct
      ? clonedDataSingleProduct
      : dataSingleProduct;
    const dataEdited = { rating: event.target.value, ...rest };
    setClonedDataSingleProduct(dataEdited);
    setRating(event.target.value);
  };

  const handleStock = (event) => {
    const { stock, ...rest } = clonedDataSingleProduct
      ? clonedDataSingleProduct
      : dataSingleProduct;
    const dataEdited = { stock: event.target.value, ...rest };
    setClonedDataSingleProduct(dataEdited);
    setStock(event.target.value);
  };

  const handleOnCancel = () => {
    setClonedDataSingleProduct({});
    setDescription("");
    setDisabled(true);
    setDiscountPercentage(0);
    setPrice(0);
    setRating(0);
    setSelectedBrand("");
    setSelectedCategory("");
    setStock(0);
  };

  const productImg = dataSingleProduct?.images?.map((img) => img);

  const saveEditing = async () => {
    await Axios.put(
      `${backend_address}/product/${selectedProduct}`,
      clonedDataSingleProduct
    ).then(() => {
      getData();
      getDataSingleProduct();
      setClonedDataSingleProduct({});
      setShowNotification(true);
    });
  };

  const Details = () => {
    return (
      <Form style={styles.form}>
        <FormGroup controlId="productDetails">
          <FormLabel>
            <strong>Product Description</strong>
          </FormLabel>
          <textarea
            className="form-control"
            disabled={disabled}
            onBlur={handleDescription}
            defaultValue={
              description ? description : dataSingleProduct?.description
            }
            rows={3}
          />
          <FormLabel>
            <strong>Category</strong>
          </FormLabel>
          <FormSelect disabled={disabled} onChange={handleCategory}>
            <option
              value={
                selectedCategory ? selectedCategory : dataSingleProduct.category
              }
            >
              {selectedCategory ? selectedCategory : dataSingleProduct.category}
            </option>
            {categoriesMapped}
          </FormSelect>
          <FormLabel>
            <strong>Brand</strong>
          </FormLabel>
          <FormSelect disabled={disabled} onChange={handleBrand}>
            <option
              value={selectedBrand ? selectedBrand : dataSingleProduct.brand}
            >
              {selectedBrand ? selectedBrand : dataSingleProduct.brand}
            </option>
            {brandsMapped}
          </FormSelect>
          <Row>
            <Col xs={6}>
              <FormLabel>
                <strong>Rating</strong>
              </FormLabel>
              <FormControl
                as="input"
                defaultValue={rating ? rating : dataSingleProduct.rating}
                disabled={disabled}
                max="10"
                min="1"
                onBlur={handleRating}
                step="0.01"
                type="number"
              />
              <FormLabel>
                <strong>Discount %</strong>
              </FormLabel>
              <FormControl
                as="input"
                defaultValue={
                  discountPercentage
                    ? discountPercentage
                    : dataSingleProduct.discountPercentage
                }
                disabled={disabled}
                max="99.99"
                min="0"
                onBlur={handleDiscountPercentage}
                step="0.01"
                type="number"
              />
            </Col>
            <Col xs={6}>
              <FormLabel>
                <strong>Price</strong>
              </FormLabel>
              <FormControl
                as="input"
                defaultValue={price ? price : dataSingleProduct?.price}
                disabled={disabled}
                max="3000"
                min="1"
                onBlur={handlePrice}
                step="0.01"
                type="number"
              />
              <FormLabel>
                <strong>Stock</strong>
              </FormLabel>
              <FormControl
                as="input"
                defaultValue={stock ? stock : dataSingleProduct?.stock}
                disabled={disabled}
                max="100"
                min="0"
                onBlur={handleStock}
                type="number"
              />
            </Col>
          </Row>
        </FormGroup>
      </Form>
    );
  };

  return (
    <>
      <Modal onHide={closeModal} show={isOpen} size="lg">
        <Container style={styles.mainContainer}>
          <Row style={styles.actions}>
            <Col
              className="d-flex justify-content-end align-content-center"
              style={styles.divActions}
              xs={12}
            >
              <DropdownButton
                id="actions_menu"
                size="sm"
                title="Actions"
                variant="outline-dark"
              >
                <DropdownItem onClick={disabled ? enableEditing : saveEditing}>
                  {disabled ? "Edit" : "Save"}
                </DropdownItem>
                {!disabled && <CancelBtn />}
              </DropdownButton>
            </Col>
          </Row>
          <Row>
            <Col xs={6}>
              <Card>
                <CardBody>
                  <CardTitle className="text-center">
                    {dataSingleProduct?.title}
                  </CardTitle>
                  <CardImg
                    variant="top"
                    src={productImg ? productImg[0] : ""}
                  />
                </CardBody>
              </Card>
            </Col>
            <Col
              className="d-flex align-items-center justify-content-start"
              xs={6}
            >
              {<Details />}
            </Col>
          </Row>
        </Container>
      </Modal>
      <ToastContainer position="bottom-start">
        <Toast
          autohide={true}
          bg="success"
          delay={3000}
          onClose={() => setShowNotification(false)}
          role="alert"
          show={showNotification}
        >
          <ToastBody className="d-flex align-items-center justify-content-center text-white">
            Your changes have been saved.
          </ToastBody>
        </Toast>
      </ToastContainer>
    </>
  );
}

export default ItemDetails;
