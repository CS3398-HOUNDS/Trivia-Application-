import React from "react";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Splash from './Splash';
import TriviaGame from './TriviaGame';
import Login from './Login';

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {selectedComponent : "Splash"};
  }

  handleClick(selection) {
    console.log(selection);
    this.setState({selectedComponent: selection});
  }

  render() {
      const userSelection = this.state.selectedComponent;
      console.log(userSelection);
    return(
      <Container>
        <Navbar bg="dark" variant="dark">
        <Navbar.Brand onClick={() => this.handleClick("Splash")}>TriviaKnights</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link onClick={() => this.handleClick("TriviaGame")}>Play</Nav.Link>
            <Nav.Link onClick={() => this.handleClick("Splash")}>Leaderboard</Nav.Link>
            <Nav.Link onClick={() => this.handleClick("Login")}>Login</Nav.Link>
          </Nav>
        </Navbar>
        {userSelection == "Splash" ? <Splash /> :
         userSelection == "Login"  ? <Login />  :
         userSelection == "TriviaGame"  ? <TriviaGame />  :
         <p>The components failed to load</p>}
      </Container>
    );
  }
}

export default NavBar;
