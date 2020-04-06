import React from "react";
import Login from "./Login";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

class NavBar extends React.Component {
  render() {
    return(
      <Container>
        <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">TriviaKnights</Navbar.Brand>
          <Nav className="mr-auto" onSelect={(selectedKey) => (console.log(`<${selectedKey} />`))}>
            <Nav.Link eventKey="About">About</Nav.Link>
            <Nav.Link eventKey="LeaderBoard">Leaderboard</Nav.Link>
            <Nav.Link eventKey="Login">Login</Nav.Link>
          </Nav>
        </Navbar>
      </Container>
    );
  }
}

export default NavBar;
