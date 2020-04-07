import React from 'react';
import ReactDOM from 'react-dom';
import NavBar from './components/NavBar';
import TriviaGame from './components/TriviaGame';
import Container from 'react-bootstrap/Container';
import Splash from './components/Splash.js';
import Button from 'react-bootstrap/Button';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.handleLoginClick = this.handleLoginClick.bind(this);
		this.handleLogoutClick = this.handleLogoutClick.bind(this);
		this.state = {isLoggedIn: false};
	}

	handleLoginClick() {
		this.setState({isLoggedIn: true});
	}

	handleLogoutClick() {
		this.setState({isLoggedIn: false});
	}
		render()
		{
			const isLoggedIn = this.state.isLoggedIn;
			let button;
			let mainContent;
			if (isLoggedIn) {
				button = <Button onClick={this.handleLogoutClick} />;
				mainContent = <TriviaGame />
			} else {
				button = <Button onClick={this.handleLoginClick} />;
				mainContent = <Splash />
			}
			return (
				<Container>
					{button}
					<NavBar/>
					{mainContent}
				</Container>

				/*
				<Container fluid='true'>
					<Button onClick={this.handleClick()}>Change Content</Button>
					<NavBar/>
					<div id={"mainContent"}>
					</div>
				</Container>*/
			);
		}
}

export default App;


