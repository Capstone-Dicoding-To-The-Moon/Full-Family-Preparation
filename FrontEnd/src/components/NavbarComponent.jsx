import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

const NavbarComponent = () => {
  return (
    <>
      <Navbar collapseOnSelect expand="md" bg="light" variant="light" className="d-flex flex-column" style={{ boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px' }}>
        <Container fluid style={{ fontFamily: 'serif' }}>
          <Link to="/" style={{ fontFamily: 'serif', fontWeight: 'bold', fontSize: '24px' }} className="navbar-brand">
            The Parentings
          </Link>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto"></Nav>
            <Nav>
              <Link className="nav-link" to="/">
                Home
              </Link>
              <Link className="nav-link" to="/artikel">
                Artikel
              </Link>
              <Link className="nav-link" to="/forumDiskusi">
                Forum Diskusi
              </Link>
              <Button variant="light" className="ms-3 buttonNav">
                Masuk
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavbarComponent;
