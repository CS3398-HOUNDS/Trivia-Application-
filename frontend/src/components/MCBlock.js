import React, {Component} from "react";

import Button from "react-bootstrap/Button";


class MCBlock extends Component {
    constructor(props) {
        super(props);
    this.state={
        selected: null
    }}

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.questions !== this.props.questions) {
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
                            <td height="75">
                                <Button
                                    className={this.state.selected === "A"? "qButton-active": "qButton-default"}
                                    variant="success"
                                    onClick={()=>this.set(0,"A")}> {this.props.questions[0]}</Button>
                            </td>
                            <td height="75">
                                <Button
                                    className={this.state.selected === "B"? "qButton-active": "qButton-default"}
                                    variant="success"
                                    value={1}
                                    onClick={()=>this.set(1,"B")}> {this.props.questions[1]}</Button>
                            </td>

                        </tr>
                        <tr>
                            <td height="75">
                                <Button
                                    className={this.state.selected === "C"? "qButton-active": "qButton-default"}
                                    variant="success"
                                    value={2}
                                    onClick={()=>this.set(2,"C")}> {this.props.questions[2]}</Button>
                            </td>
                            <td height="75">
                                <Button
                                    className={this.state.selected === "D"? "qButton-active": "qButton-default"}
                                    variant="success"
                                    value={3}
                                    onClick={()=>this.set(3,"D")}> {this.props.questions[3]}</Button>
                            </td>
                        </tr>

                    </tbody>
                    </table>

        )
    }
}

export default MCBlock;