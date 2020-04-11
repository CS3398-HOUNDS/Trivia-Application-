import React from "react";
import Container from 'react-bootstrap/Container';
import '../style.css'
import { Row, Col } from 'react-bootstrap';

class Splash extends React.Component {
    render() {
        return(
            <Container style={{backgroundColor: "#d5f4e6", maxHeight: "100%", textAlign:"center"}} className={"asd"}>
                    <Row>
                        <img src={require("../imgs/2.png")} />
                        <img src={require("../imgs/3.png")} />
                        <img src={require("../imgs/4.png")} />
                        <img src={require("../imgs/5.png")} />
                        <img src={require("../imgs/6.png")} />
                    </Row>
                    <img className={"letterhead"} src={require("../imgs/LH4.png")}/>
                    <Row>
                        <img src={require("../imgs/1.png")} />
                        <img src={require("../imgs/6.png")} />
                        <img src={require("../imgs/3.png")} />
                        <img src={require("../imgs/2.png")} />
                        <img src={require("../imgs/4.png")} />
                    </Row>
                </Container>
        );
    }
}

export default Splash;