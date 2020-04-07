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
		//NOTE: The "logged in"/"logged out" names were from the tutorial this code was ripped from, all these do is
		// switch between two states
		this.handleLoginClick = this.handleLoginClick.bind(this);
		this.handleLogoutClick = this.handleLogoutClick.bind(this);
		this.state = {isLoggedIn: false};
	}

	//These state changes are being handled directly in the App component but for navbar to work we need to find a way
	//for the Navbar states to update App, or have Navbar render the content as its own child.
	//Either way, data handling should be kept in one place I think (like user login, game request, questions)
	handleLoginClick() {
		this.setState({isLoggedIn: true});
	}

	handleLogoutClick() {
		this.setState({isLoggedIn: false});
	}
		render()
		{
			//This is the main block of code that does the work. Button has to be updated in order to go back and forth
			//but in Navbar they won't need to do any updating
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

			//This just tells it to render whatever button or mainContent is set to
			return (
				<Container>
					{button}
					<NavBar/>
					{mainContent}
				</Container>

				//Previous code, for reference
				/*
			<Container fluid='true'>
				<NavBar/>
				<Splash/>
			</Container>*/
			);
		}
}

export default App;


