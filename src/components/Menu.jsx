import { black, green } from "../general/colors"
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useState } from "react";

function MainMenu() {
  const [active, setActive] = useState('Stock');

  const styles = {
    link: {
      color: black,
      textDecoration: 'none',
    },
    activeLink: {
      color: green,
      textDecoration: 'underline',
    }
  };

  const menuItems = [
    {
      id: 1,
      to: '/pages/Insights',
      text: 'Insights'
    },
    {
      id: 2,
      to: '/pages/Stock',
      text: 'Stock'
    },
    {
      id: 3,
      to: '/pages/Sell',
      text: 'Sell'
    }
  ];

  const currentPage = (event) => {
    setActive(event.target.text);
  };

  const links = menuItems.map((item) => {
    return(
      <Link
        key={item.id}
        onClick={currentPage}
        style={item.text == active ? styles.activeLink : styles.link}
        to={item.to}
      >
        {item.text}
      </Link>
    );
  });

  return (
    <Navbar className="bg-body-tertiary" sticky="top">
      <Container className="d-flex justify-content-start gap-5">
        <Navbar navbar-brand="true" href="#home">
          <img
            alt="logo"
            className="d-inline-block align-top"
            height={50}
            width={50}
            src="../src/assets/logo.svg"
          />
        </Navbar>
        <Nav className="d-flex flex-row gap-3">
          {links}
        </Nav>
      </Container>
    </Navbar>
  );
}

export default MainMenu;
