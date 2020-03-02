import React from 'react';
import TriviaGame from './components/TriviaGame';
import Login from './components/Login';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

var show;
function choose(status){
    show = status;
}

function App() {

  return (
          <Container fluid='true'>
              <Navbar className="w3-top">
                <div className="w3-bar w3-card row">
                  <a className="w3-bar-item w3-button w3-padding-large w3-hide-medium w3-hide-large w3-right" href="javascript:void(0)" title="Toggle Navigation Menu"><i className="fa fa-bars"></i></a>
                  <a href="./index.html" className="w3-bar-item w3-button w3-teal w3-padding-large w3-hover-white w3-hide-small" onClick={choose('login')}>Login</a>
                  <a href="./login.html" className="w3-bar-item w3-button w3-teal w3-padding-large w3-hover-white w3-hide-small" onClick={choose('trivia')}>Game</a>
                  <a href="https://github.com/CS3398-HOUNDS/CS3398-Klingons-S2020" className="w3-bar-item w3-button w3-teal w3-padding-large w3-hover-white w3-hide-small">Github</a>
                </div>
            </Navbar>
              <div>
                  <TriviaGame />
              </div>
        </Container>

  );
}

export default App;
