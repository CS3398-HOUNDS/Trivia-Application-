import React, {Component} from 'react';
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";
import {Formik} from "formik";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            email: '',
            buttonAction: '',
            success: false,
            errorMessage: ''
        };

        //MUST BIND for function to work
        this.updatePassword = this.updatePassword.bind(this)
        this.updateUsername = this.updateUsername.bind(this)
        this.postData = this.postData.bind(this)
        const errorMessage = this.state.errorMessage
    }

    postData(values) {
        if (this.state.buttonAction === "Login") {
            const requestUrl = "http://klingons.pythonanywhere.com/api/auth/token/login/";
            let response = fetch(requestUrl, {
                method: "POST",
                dataType: "JSON",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "password": values.password,
                    "username": values.username
                })
            })
                .then((resp) => {
                    if (resp.status === 200) {
                        this.setState({success: true});
                    }
                    return resp.json();
                })
                .then((resp) => {
                    if (this.state.success) {
                        this.props.setToken("Token " + resp.auth_token)
                    } else {
                        let str = JSON.stringify(resp)
                        let final = str.replace(/{|},|}/g, "\n").replace(/\[|\]|"/g, "").replace(/,/g, ',\n')
                        console.log(resp);
                        this.setState({errorMessage: final})
                    }
                })
                .catch((error) => {
                    console.log(error, "catch the hoop")
                });
        } else if (this.state.buttonAction === "Create") {
            const requestUrl = "http://klingons.pythonanywhere.com/api/auth/users/";
            let response = fetch(requestUrl, {
                method: "POST",
                dataType: "JSON",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "password": values.password,
                    "username": values.username,
                    "email": values.email
                })
            })
                .then((resp) => {
                    console.log(resp)
                    if (resp.status === 201) {
                        this.setState({success: true});
                    }
                    return resp.json();
                })
                .then((resp) => {
                    console.log(resp)
                    if (this.state.success) {
                        this.setButtonAction("Login")
                        this.postData(values)
                    } else {
                        let str = JSON.stringify(resp)
                        let final = str.replace(/{|},|}/g, "\n").replace(/\[|\]|"/g, "").replace(/,/g, ',\n')
                        console.log(resp);
                        this.setState({errorMessage: final})
                    }
                })
                .catch((error) => {
                    console.log(error, "catch the hoop")
                });
        }
    }

    setButtonAction(choice) {
        this.setState({buttonAction: choice})
    }

    //Function used specifically as a callback to this component from child component, passed to it in render()
    updateUsername(usr) {
        this.setState({username: usr})
    }

    updatePassword(pwd) {
        this.setState({password: pwd})
    }

    render() {
        return (
            <Container>
                <Row><Container style={{width: "300px"}}>
                    <div style={{"color": "red"}}>{this.state.errorMessage}</div>
                </Container>
                    <Container style={{width: "300px"}}>

                        <Row>
                            <Formik initialValues={{
                                username: "",
                                password: "",
                                email: ""
                            }}

                                    onSubmit={(values, {setSubmitting, resetForm}) => {
                                        // When button submits form and form is in the process of submitting, submit button is disabled
                                        setSubmitting(true);
                                        this.postData(values);
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
                                {({values, handleChange, handleSubmit, isSubmitting}) => (
                                    <Form onSubmit={handleSubmit}>
                                        <Form.Group controlId="username">
                                            <br/>
                                            <Form.Control
                                                name="username"
                                                placeholder="username"
                                                onChange={handleChange}
                                                value={values.username}
                                            />
                                        </Form.Group>
                                        <Form.Group controlId="password">
                                            <br/>
                                            <Form.Control
                                                type="password"
                                                placeholder="password"
                                                onChange={handleChange}
                                                value={values.password}
                                            />
                                        </Form.Group>
                                        <Button
                                            type={"submit"}
                                            onClick={() => {
                                                this.setButtonAction("Login")
                                            }}
                                            disabled={isSubmitting}
                                        >Login</Button>
                                        <br/>
                                        <br/>
                                        <br/>
                                        <div style={{"box-shadow": "0px 0px 6px 9px rgba(255,255,255,.8)"}}>New to
                                            Trivia Knights? Just add your email and press Sign Up.
                                        </div>
                                        <br/>
                                        <Form.Group controlId="email">
                                            <Form.Control type="email" placeholder="email"/>
                                        </Form.Group>
                                        <Button
                                            type={"submit"}
                                            disabled={isSubmitting}
                                            onClick={() => {
                                                this.setButtonAction("Create")
                                            }}
                                        >Sign Up</Button>
                                    </Form>)}
                            </Formik>

                        </Row>
                    </Container>
                    <Container style={{width: "300px"}}>
                        <div style={{"visibility": "hidden"}}><Button/></div>
                    </Container>
                </Row>
            </Container>
        );
    }
}

export default Login;
