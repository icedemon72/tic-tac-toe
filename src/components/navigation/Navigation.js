import React from 'react';
import { Link } from 'react-router-dom';

// Bootstrap
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
const Navigation = (props) => {
  return (
    <>
      <Navbar collapseOnSelect expand="md" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand></Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as='div' disabled={props.playing}>
                <Link to='/'>Home</Link>
              </Nav.Link>
              <Nav.Link as='div' disabled={props.playing}>
                <Link to='/game'>PLAY!</Link>
              </Nav.Link>
              <Nav.Link as='div' disabled={props.playing}>
                <Link to='/stats'>Stats</Link>
              </Nav.Link> 
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}

export default Navigation;