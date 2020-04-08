import React from 'react';
import ReactDOM from 'react-dom';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Splash from './components/Splash';
import TriviaGame from './components/TriviaGame';
import Login from './components/Login';
import CreateGame from './components/CreateGame';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {selectedComponent : "Splash"};
  }

  handleClick(selection) {
    this.setState({selectedComponent: selection});
  }

  render() {
    const userSelection = this.state.selectedComponent;

    return(
      <Container fluid='true'>
        <Navbar bg="dark" variant="dark">
        <Navbar.Brand onClick={() => this.handleClick("Splash")}>TriviaKnights</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link onClick={() => this.handleClick("TriviaGame")}>Play</Nav.Link>
            <Nav.Link onClick={() => this.handleClick("Splash")}>Leaderboard</Nav.Link>
            <Nav.Link onClick={() => this.handleClick("Login")}>Login</Nav.Link>
            <Nav.Link onClick={() => this.handleClick("Create")}>Create</Nav.Link>

          </Nav>
        </Navbar>

        {userSelection == "Splash" ? <Splash /> :
         userSelection == "Login"  ? <Login />  :
         userSelection == "TriviaGame"  ? <TriviaGame />  :
             userSelection == "Create"  ? <CreateGame />  :
         <p>The components failed to load</p>}
      </Container>
    );
  }
}

export default App;
