import React from "react";
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from "react-bootstrap/Form";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col } from 'react-bootstrap';
import '../style.css';
import { Formik } from 'formik';


class CreateGame extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    };

// This is the main logic for submission button. Its so large because it has to set states, calculate URL and handle the
//fetch. After execution, question data is held in (this.state.questionBank)
    fetchData = (values, questionBank) => {
        let amount = values.questionCount;
        let type = "";
        let category = null;
        let url = "";
        let timer = values.timerLength;

        //This block builds the URL for the api call to make questions
        if (values.qType == "Multiple Choice") {
            type = "multiple"
        }else{
            type = "boolean"
        }
        if (values.triviaCategories == "Sports"){
            category = 21
        } else if (values.triviaCategories == "Music"){
            category = 21
        } else if (values.triviaCategories == "Politics"){
            category = 21
        } else if (values.triviaCategories == "History") {
            category = 21
        }else{
            category = 11
        }
        if (values.timerLength == "15s"){
            timer = 15
        } else if (values.timerLength == "30s"){
            timer = 30
        } else if (values.timerLength == "60s"){
            timer = 60
        }else{
            timer = 0
        }
        this.setState({
            type: type,
            timer: timer
        });
        console.log(this.state);
        //set the url
        {{url = "https://opentdb.com/api.php?amount=" + amount + "&category=" + category + "&difficulty=medium&type=" + type}}
        console.log(url);
            fetch(url, {
            method: "GET",
            dataType: "JSON",
        })
            .then((resp) => {
                return resp.json()
            })
            .then((data) => {
                this.setState({ questionBank: data.results })
            })
            .catch((error) => {
                console.log(error, "catch the hoop")
            })
    };

    render() {
        return(
            <Container style={{textAlign: "center"}}>

                <img className={"LetterHead"} src={require("../imgs/LH4.png")} style={{width:"350px",
                    height: "auto",
                    opacity: "1",
                    padding:"2",
                    textAlign: "center"
                }}/>

                <Formik initialValues={{
                    triviaCategories: "Sports",
                    qType: "Multiple Choice",
                    questionCount: 2,
                    timerLength: "15s"}}
                        onSubmit={(values, {setSubmitting, resetForm}) => {
                            // When button submits form and form is in the process of submitting, submit button is disabled
                            setSubmitting(true);
                            this.fetchData(values)
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
                    {/* Callback function containing Formik state and helpers that handle common form actions */}
                    {( {values,
                           handleChange,

                           handleSubmit,
                           isSubmitting }) => (
                    <Form onSubmit={handleSubmit}>
                        <br/>
                        <Form.Group controlId={"triviaCategories"}>
                            <Row>
                                <Form.Label column={"lg"} lg={3}>
                                    Trivia Category:
                                </Form.Label>
                                <Col sm={2}>
                                    <Form.Control
                                        as={"select"}
                                        onChange={handleChange}
                                    value={values.triviaCategories}>
                                        <option>History</option>
                                        <option>Sports</option>
                                        <option>Politics</option>
                                        <option>Music</option>
                                        <option>Movies</option>
                                    </Form.Control>
                                </Col>
                            </Row>
                        </Form.Group>
                        <br/>
                        <Form.Group controlId={"qType"}>
                            <Row>
                                <Form.Label  column="lg" lg={3}>Question Types:</Form.Label>
                                <Col sm={2}>
                                    <Form.Control
                                        as={"select"}
                                        onChange={handleChange}
                                        value={values.qType}>
                                        <option>Multiple Choice</option>
                                        <option>True or False</option>
                                    </Form.Control>
                                </Col>
                            </Row>
                        </Form.Group>
                        <br/>
                        <Form.Group controlId={"questionCount"}>
                            <Row>
                                <Form.Label  column="lg" lg={3}>Number of Questions:</Form.Label>
                                <Col sm={2}>
                                    <Form.Control as={"select"}
                                    onChange={handleChange}
                                    value={values.questionCount}>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                    </Form.Control>
                                </Col>
                            </Row>
                        </Form.Group>
                        <br/>
                        <Form.Group controlId={"timerLength"}>
                            <Row>
                                <Form.Label  column="lg" lg={3}>Question Timer:</Form.Label>
                                <Col sm={2}>
                                    <Form.Control
                                        as={"select"}
                                    onChange={handleChange}
                                    value={values.timerLength}>
                                        <option>15s</option>
                                        <option>30s</option>
                                        <option>60s</option>
                                        <option>OFF</option>
                                    </Form.Control>
                                </Col>
                            </Row>
                        </Form.Group>
                        <br/>
                        <Button type={"submit"} disabled={isSubmitting}>Create New Game</Button>
                        <br/>
                    </Form>)}
                </Formik>
            </Container>

        );
    }
}

export default CreateGame;