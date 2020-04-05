import React from 'react';
import NavBar from './components/NavBar';
import TriviaGame from './components/TriviaGame';
import Container from 'react-bootstrap/Container';

var show;
function choose(status){
    show = status;
}

function App() {
	return(
	<Container fluid='true'>
		<NavBar />
		<TriviaGame />
	</Container>
  );
}

export default App;


