import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function Menu() {
  return (
    <Navbar className="bg-body-tertiary" sticky="top">
      <Container className="d-flex justify-content-start gap-5">
        <Navbar navbar-brand="true" href="#home">
          <img
            alt="logo"
            className="d-inline-block align-top"
            height={50}
            width={50}
            src="src/assets/logo.svg"
          />
        </Navbar>
        <Nav className="d-flex flex-row gap-3">
          <Link to="/pages/Insights">INSIGHTS</Link>
          <Link to="/pages/Stock">STOCK</Link>
          <Link to="/pages/Sell">SELL</Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Menu;
