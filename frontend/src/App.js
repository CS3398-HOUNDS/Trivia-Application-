import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Splash from './components/Splash';
import TriviaGame from './components/TriviaGame';
import Login from './components/Login';
import CreateGame from './components/CreateGame';
//import UserProfile from './components/UserProfile';
import Leaderboard from './components/Leaderboard';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      selectedComponent : "Splash",
      userToken : "",
      userLoggedIn: false,
      username: "",
      userId: "",
      userEmail: ""
    };

    this.updateGameData = this.updateGameData.bind(this);
    this.setUserToken = this.setUserToken.bind(this)
  }

  setUserToken(token){
    this.setState({userToken: token})
}

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevState.userToken !== this.state.userToken && !this.state.userLoggedIn) {
      this.setState({userLoggedIn: true})
      this.getUserInfo()
    }
  }

  getUserInfo(){
    const requestUrl = "http://klingons.pythonanywhere.com/api/auth/users/me/";
    let response = fetch(requestUrl, {
      method: "GET",
      dataType: "JSON",
      headers: {
        "Authorization": this.state.userToken
      }})
        .then((resp) => {
          console.log(this.state.userToken)
          return resp.json();
        })
        .then((resp) => {
          console.log(resp)
          this.setState({username: resp.username, userId:resp.id, userEmail: resp.email})
        })
        .then((resp) => {
          console.log(this.state)
          this.handleClick("Splash")
        })
        .catch((error) => {
          console.log(error, "catch the hoop")
        });

  }

  handleClick(selection) {
    //Prompts user to confirm quit in case game is active
    //IF : currently in game, do selected confirmation window
    if (this.state.selectedComponent === "TriviaGame"){
        if (selection === "Quit") {
          if (window.confirm("Are you sure you want to quit this game?")) {
            this.setState({selectedComponent: "Splash"});
          }
        } else {
          if (window.confirm("Leaving will quit your current game. Press OK to continue to " + selection + ".")) {
            this.setState({selectedComponent: selection});
          }
        }
    //else (not in game): Change selected component state
    } else {
    this.setState({selectedComponent: selection});
    }
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
          <Navbar.Brand onClick={() => this.handleClick("Splash")}>Splash Screen</Navbar.Brand>
            <Nav className="mr-auto">
              <Nav.Link onClick={() => this.handleClick("Leaderboard")}>Leaderboard</Nav.Link>
              <Nav.Link onClick={() => this.handleClick("Login")}>Login</Nav.Link>

              {/*Changes Play to Quit button if in game*/}
              {this.state.selectedComponent !== "TriviaGame" ?
              <Nav.Link
                  className="superButton"
                  style={{backgroundColor: "#0D9469"}}
                  onClick={() => this.handleClick("Create")}><b>Play</b></Nav.Link>
                  :
                  <Nav.Link
                      className="superButton"
                      style={{backgroundColor: "#000000"}}
                      onClick={() => this.handleClick("Quit")}><b>Quit</b></Nav.Link>}
            </Nav>
          </Navbar>

          {userSelection === "Splash" ? <Splash /> :
           userSelection === "Leaderboard" ? <Leaderboard /> :
           userSelection === "Login"  ? <Login
               setToken={this.setUserToken}
               />  :
           userSelection === "TriviaGame"  ? <TriviaGame
             requestUrl={this.state.requestUrl}
             type={this.state.type}
             timer={this.state.timer}
             maxQuestions={this.state.maxQuestions}/>  :
           userSelection === "Create"  ? <CreateGame
             callbackGameData ={this.updateGameData}
             switchToTrivia = {this.handleClick}/>  :
          <p>The components failed to load</p>}
      </Container>
    );
  }
}

export default App;
