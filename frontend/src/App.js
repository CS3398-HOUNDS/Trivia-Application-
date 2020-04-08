import React from 'react';
import ReactDOM from 'react-dom';
import Container from 'react-bootstrap/Container';
import NavBar from './components/NavBar';
import CreateGame from "./components/CreateGame";

class App extends React.Component {
  render() {
    return(
      <Container fluid='true'>
          <NavBar/>
      </Container>
    );
  }
}

export default App;
