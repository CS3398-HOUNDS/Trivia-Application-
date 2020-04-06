import React from "react";
import '../style.css'

class Splash extends React.Component {
    render() {
        return(
            <body bgcolor={"#d5f4e6"}>
            <div style={{maxWidth:"2000px"}}>
                <div className="w3acontainer w3-content w3-center w3-padding-64" style={{maxWidth: "800"}}>
                    <div id="firstroot">
                        <div className="row" style={{
                            display: "flex",
                            minWidth: "100%"}}>
                            <div className="column">
                                <img src={require("../imgs/2.png")} style={{width:"100%"}} />
                            </div>
                            <div className="column">
                                <img src={require("../imgs/3.png")} style={{width:"100%"}}/>
                            </div>
                            <div className="column">
                                <img src={require("../imgs/4.png")} style={{width:"100%"}}/>
                            </div>
                            <div className="column">
                                <img src={require("../imgs/5.png")} style={{width:"100%"}}/>
                            </div>
                            <div className="column">
                                <img src={require("../imgs/6.png")} style={{width:"100%"}}/>
                            </div>
                        </div>

                        <img className={"LetterHead"} src={require("../imgs/LH4.png")} style={{maxWidth:"75%",
                            height: "auto",
                            opacity: "1",
                            padding:"5",
                            textAlign: "center"
                        }}/>

                        <div className="row" style={{
                            display: "flex",
                            minWidth: "100%"}}>
                            <div className="column">
                                <img src={require("../imgs/1.png")} style={{width:"100%"}}/>
                            </div>
                            <div className="column">
                                <img src={require("../imgs/6.png")} style={{width:"100%"}}/>
                            </div>
                            <div className="column">
                                <img src={require("../imgs/3.png")} style={{width:"100%"}}/>
                            </div>
                            <div className="column">
                                <img src={require("../imgs/2.png")} style={{width:"100%"}}/>
                            </div>
                            <div className="column">
                                <img src={require("../imgs/4.png")} style={{width:"100%"}}/>
                            </div>
                        </div>

                    </div>
                </div></div>
            </body>
        );
    }
}

export default Splash;