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
            password:'',
            email:''
        };

        //MUST BIND for function to work
        this.updatePassword = this.updatePassword.bind(this)
        this.updateUsername = this.updateUsername.bind(this)
        this.postLogin = this.postLogin.bind(this)
    }

    postLogin(){
        const requestUrl = "http://klingons.pythonanywhere.com/api/auth/token/login/";

        let response = fetch(requestUrl, {
            method: "POST",
            dataType: "JSON",
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({
                "password": this.password,
                "username": this.username
            })
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

    postCreateUser(){
        const requestUrl = "http://klingons.pythonanywhere.com/api/auth/users/";

        let response = fetch(requestUrl, {
            method: "POST",
            dataType: "JSON",
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({
                "email": this.email,
                "username": this.username,
                "password": this.password
            })
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

    updatePassword(pwd){
        this.setState({password:pwd})
    }

    render() {
        return (
            <Container style={{width: "200px"}}>
                {/*Render the component and pass it the function used to update username as a prop*/}
                <row>
                    <Formik initialValues={{username:"",password:"",email:""}}>
                        {({values}) =>(
                        <Form>
                            <Form.Group controlId="formGroupUsername">
                                <Form.Label>Username</Form.Label>
                                <Form.Control name="username" placeholder="Enter Username" onChange={this.updateUsername} value=""/>
                            </Form.Group>
                            <Form.Group controlId="formGroupPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" onChange={this.updatePassword}/>
                            </Form.Group>
                            <Button onClick={this.postLogin}>Login</Button>
                            <p>New to Trivia Knights? Just add your email and press Sign Up.</p>
                            <Form.Group controlId="formGroupEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" placeholder="Enter email"/>
                            </Form.Group>
                            <Button onClick={this.postCreateUser}>Sign Up</Button>
                        </Form>)}
                    </Formik>

                </row>
            </Container>
        );
    }
}
export default Login;
