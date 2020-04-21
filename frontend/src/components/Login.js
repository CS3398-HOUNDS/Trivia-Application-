import React, {Component} from 'react';
import Form from 'react-bootstrap/Form';
import Devtest from './Devtest'
import Button from "react-bootstrap/Button";
import {Formik} from "formik";
import Container from "react-bootstrap/Container";

class Login extends Component {
    constructor(props){
        super(props);
        this.state={
            username:'',
            password:''
        };

        //MUST BIND for function to work
        this.updateUsername = this.updateUsername.bind(this)
        this.postLogin = this.postLogin.bind(this)
    }

    postLogin(){
        const requestUrl = "http://klingons.pythonanywhere.com/api/auth/token/login/";
        const bdy = {
            "password": "middleFINGER123!@#",
            "username": "soheezy"
        };

        let response = fetch(requestUrl, {
            method: "POST",
            dataType: "JSON",
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(bdy)
        })
            .then((resp) => {
                return resp.json();
            })
            .then((resp) => {
                    console.log(resp)
            })
            .catch((error) => {
                console.log(error, "catch the hoop")
            });
    }

    //Function used specifically as a callback to this component from child component, passed to it in render()
    updateUsername(usr){
        this.setState({username:usr})
    }
    render() {
        return (
            <Container style={{width: "200px"}}>
                {/*This span just shows the result of the button click, initially set to ""*/}
                <span><Button onClick={this.postLogin}>post login</Button></span>

                {/*Render the component and pass it the function used to update username as a prop*/}
                <row>
                    <Formik>
                        <Form>
                            <Form.Group controlId="formGroupEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email"/>
                            </Form.Group>
                            <Form.Group controlId="formGroupPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password"/>
                            </Form.Group>
                        </Form>
                    </Formik>
                </row>
            </Container>
        );
    }
}
export default Login;
