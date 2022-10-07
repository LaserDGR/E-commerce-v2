import React, { useState } from 'react';
import { Container, Navbar, Nav, Offcanvas } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import CarSidebar from './CarSidebar';

const MyNavBar = () => {

  const navigate = useNavigate();

  const logout = () => {
    localStorage.setItem("token", "")
    navigate("/login")
  }

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand to="/" as={Link}>Navbar</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link to="/login" as={Link}>Login</Nav.Link>
              <Nav.Link to="/car" as={Link}>Purchases</Nav.Link>
              <Nav.Link onClick={handleShow} >Carrito De Compras</Nav.Link>
              <Nav.Link onClick={logout}>Logout</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <CarSidebar show={show} handleClose={handleClose}/>
    </>
  );
};

export default MyNavBar;