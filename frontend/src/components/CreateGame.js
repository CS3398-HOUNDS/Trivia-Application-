import React from "react";
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from "react-bootstrap/Form";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col } from 'react-bootstrap';
import '../style.css';

class CreateGame extends React.Component {
    render() {
        return(
            <Container>
                <Col></Col><Col>
                <img className={"LetterHead"} src={require("../imgs/LH3.png")} style={{maxWidth:"25%",
                    height: "auto",
                    opacity: "1",
                    padding:"2",
                    textAlign: "center"
                }}/>
                <Form>
                    <br/>
                    <Form.Group controlID={"categoryChoice"}>
                        <Row>
                            <Form.Label column={"lg"} lg={3}>
                                Trivia Category:
                            </Form.Label>
                            <Col sm={2}>
                                <Form.Control as={"select"}>
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
                    <Form.Group controlID={"typeChoice"}>
                        <Row>
                            <Form.Label  column="lg" lg={3}>Question Types:</Form.Label>
                            <Col>
                                <Form.Check
                                    type={"checkbox"}
                                    id={'TF'}
                                    label={`True/False`}
                                />
                                <Form.Check
                                    defaultChecked={"True"}
                                    type={"checkbox"}
                                    id={'MC'}
                                    label={`Multiple Choice`}
                                />
                            </Col>
                        </Row>
                    </Form.Group>
                    <br/>
                    <Form.Group controlID={"questionCount"}>
                        <Row>
                            <Form.Label  column="lg" lg={3}>Number of Questions:</Form.Label>
                            <Col sm={1}>
                                <Form.Control as={"select"}>
                                    <option>5</option>
                                    <option>10</option>
                                    <option>15</option>
                                </Form.Control>
                            </Col>
                        </Row>
                    </Form.Group>
                    <br/>
                    <Form.Group controlID={"timersChoice"}>
                        <Row>
                            <Form.Label  column="lg" lg={3}>Questions Timers:</Form.Label>
                            <Col>
                                <Form.Check
                                    inline
                                    defaultChecked={"True"}
                                    name={"qTimer"}
                                    type={"radio"}
                                    id={'qTimerOn'}
                                    label={`On`}
                                />
                                <Form.Check
                                    inline
                                    name={"qTimer"}
                                    type={"radio"}
                                    id={'qTimerOff'}
                                    label={"Off"}
                                />
                            </Col>
                        </Row>
                    </Form.Group>
                    <br/>
                    <Form.Group controlID={"timerDifficulty"}>
                        <Row>
                            <Form.Label  column="lg" lg={3}>Timer Length:</Form.Label>
                            <Col sm={1}>
                                <Form.Control as={"select"}>
                                    <option>10s</option>
                                    <option>15s</option>
                                    <option>20s</option>
                                    <option>30s</option>
                                    <option>60s</option>
                                </Form.Control>
                            </Col>
                        </Row>
                    </Form.Group>
                    <br/>
                    <Col></Col><Col>
                    <Button type={"submit"}>Create New Game</Button></Col>
                    <Col></Col>
                    <br/>
                </Form>
            </Col>
            </Container>

        );
    }
}

export default CreateGame;