import React from "react";
import Container from "react-bootstrap/Container";
import '../style.css'

class Splash extends React.Component {
    render() {
        return(
            <body>
            <div className="splashBody">
                <div className="splash">
                    <span className="row " >
                        <img className="image-column" src={require("../imgs/2.png")} />
                        <img className="image-column" src={require("../imgs/3.png")} />
                        <img className="image-column" src={require("../imgs/4.png")} />
                        <img className="image-column" src={require("../imgs/5.png")} />
                        <img className="image-column" src={require("../imgs/6.png")} />
                    </span>
                    <img className={"letterhead"} src={require("../imgs/LH4.png")}/>
                    <span className={"row"}>
                        <img src={require("../imgs/1.png")} />
                        <img src={require("../imgs/6.png")} />
                        <img src={require("../imgs/3.png")} />
                        <img src={require("../imgs/2.png")} />
                        <img src={require("../imgs/4.png")} />
                    </span>
                </div>
            </div>
            </body>
        );
    }
}

export default Splash;