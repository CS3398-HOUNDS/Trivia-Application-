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
    this.updateGameData = this.updateGameData.bind(this);
  }

  handleClick(selection) {
    this.setState({selectedComponent: selection});
  }

  updateGameData(url, type, timer, maxQuestions){
    this.setState({
      requestUrl: url,
      timer: timer,
      type: type,
      maxQuestions: maxQuestions,
    });
  }




  render() {
    const userSelection = this.state.selectedComponent;

    return(
        <Container fluid='true'>
          <Navbar bg="dark" variant="dark">
            <Navbar.Brand onClick={() => this.handleClick("Splash")}>TriviaKnights</Navbar.Brand>
            <Nav className="mr-auto">
              <Nav.Link onClick={() => this.handleClick("Splash")}>Leaderboard</Nav.Link>
              <Nav.Link onClick={() => this.handleClick("Login")}>Login</Nav.Link>
              <Nav.Link style ={{backgroundColor: "#0D9469", color: "white", marginLeft: "10px", letterSpacing: "3px" }} onClick={() => this.handleClick("Create")}><b>Play</b></Nav.Link>

            </Nav>
          </Navbar>

            {userSelection == "Splash" ? <Splash /> :
              userSelection == "Login"  ? <Login />  :
              userSelection == "TriviaGame"  ? <TriviaGame
                requestUrl={this.state.requestUrl}
                type={this.state.type}
                timer={this.state.timer}
                maxQuestions={this.state.maxQuestions}/>  :
              userSelection == "Create"  ? <CreateGame
                      callbackGameData ={this.updateGameData}
                      switchToTrivia = {this.handleClick}/>  :
              <p>The components failed to load</p>}
        </Container>
    );
  }
}

export default App;
