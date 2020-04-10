import React, {Component} from 'react';
import Form from 'react-bootstrap/Form';
import Devtest from './Devtest'

class Login extends Component {
    constructor(props){
        super(props);
        this.state={
            username:'',
            password:''
        };

        //MUST BIND for function to work
        this.updateUsername = this.updateUsername.bind(this)
    }

    //Function used specifically as a callback to this component from child component, passed to it in render()
    updateUsername(usr){
        this.setState({username:usr})
    }
    render() {
        return (
            <div>
                {/*This span just shows the result of the button click, initially set to ""*/}
                <span>Hello {this.state.username}</span>

                {/*Render the component and pass it the function used to update username as a prop*/}
                <Devtest triggerUserUpdate={this.updateUsername}/>

                <Form>
                    <Form.Group controlId="formGroupEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                    </Form.Group>
                    <Form.Group controlId="formGroupPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                </Form>
            </div>
        );
    }
}

export default Login;
