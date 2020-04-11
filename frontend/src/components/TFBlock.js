
import React, {Component} from "react";

import Button from "react-bootstrap/Button";


class TFBlock extends Component {
    constructor(props) {
        super(props);
        this.state={
            selected: null
        }}

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.counter !== this.props.counter) {
            this.setState({selected: null})
        }}

    set(value, choice){
        this.props.answerCallback(value);
        this.setState({selected: choice})
    }


    render(){
        return(

            <table className={"buttons"}>
                <tbody>

                <tr>
                    <td height="80">
                        <Button
                            className={this.state.selected === "A"? "qButton-active": "qButton-default"}
                            variant="success"
                            onClick={()=>this.set("True","A")}><h2>True</h2>  </Button>
                    </td>
                    <td height="80">
                        <Button
                            className={this.state.selected === "B"? "qButton-active": "qButton-default"}
                            variant="success"
                            value={1}
                            onClick={()=>this.set("False","B")}><h2>False</h2></Button>
                    </td>

                </tr>

                </tbody>
            </table>

        )
    }
}

export default TFBlock;