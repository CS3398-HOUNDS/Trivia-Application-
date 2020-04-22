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

    postLogin(values){
        const requestUrl = "http://klingons.pythonanywhere.com/api/auth/token/login/";

        let response = fetch(requestUrl, {
            method: "POST",
            dataType: "JSON",
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({
                "password": values.password,
                "username": values.username
            })
        })
            .then((resp) => {
                return resp.json();
            })
            .then((resp) => {
                return "Token " + resp.auth_token
            })
            .then((resp) => {
                this.props.setToken(resp)
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
                    <Formik initialValues={{
                        username:"",
                        password:"",
                        email:""}}

                            onSubmit={(values, {setSubmitting, resetForm}) => {
                                // When button submits form and form is in the process of submitting, submit button is disabled
                                setSubmitting(true);
                                this.postLogin(values)
                                setTimeout(() => {

                                    //alert(JSON.stringify(values, null, 2));
                                    setSubmitting(false);
                                }, 500);

                                /* Resets form after submission is complete
                                resetForm();

                                // Sets setSubmitting to false after form is reset
                                setSubmitting(false);*/
                            }}
                    >
                        {({values, handleChange, handleSubmit, isSubmitting}) =>(
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="username">
                                <Form.Label>Username</Form.Label>
                                <Form.Control
                                    name="username"
                                    placeholder="username"
                                    onChange={handleChange}
                                    value={values.username}
                                />
                            </Form.Group>
                            <Form.Group controlId="password">
                                <Form.Label>password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="password"
                                    onChange={handleChange}
                                    value={values.password}
                                />
                            </Form.Group>
                            <Button
                                type={"submit"}
                                disabled={isSubmitting}
                                >Login</Button>
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
