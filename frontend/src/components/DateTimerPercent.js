import React, {useState} from "react";
import ReactDOM from "react-dom";
import {ProgressBar} from "react-bootstrap";


class DateTimerPercent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            targetDate: new Date().getTime() + (this.props.tValue * 1000),
            remainingSeconds: this.props.tValue * 1000,
            resetValue: "",
            getTimeValue: "",
        }
        let percentValue;
    }

    setTargetDate(x) {
        this.setState({targetDate: x})
    }

    setRemainingSeconds(x) {
        this.setState({remainingSeconds: x})
    }


    countItDown = () =>
        requestAnimationFrame(() => {
            const diff = Math.floor(((this.state.targetDate - new Date().getTime())));
            this.setRemainingSeconds(diff);
        });

    resetTimer = () => {
        this.setState({
            targetDate: new Date().getTime() + (this.props.tValue * 1000),
            remainingSeconds: this.props.tValue * 1000, resetValue: this.props.resetValue
        })
    };

    returnTime(perVal) {
        this.props.getTime(perVal)
        this.setState({getTimeValue: this.props.getTimeValue})
    }

    makeZero() {
        this.setState({remainingSeconds: 0})
    }


    render() {
        {
            this.state.remainingSeconds > 0 &&
            this.countItDown()
        }
        {
            this.state.resetValue !== this.props.resetValue &&
            this.resetTimer()
        }
        {
            this.state.remainingSeconds < 0 &&
            this.makeZero()
        }
        this.percentValue = Math.round((this.state.remainingSeconds / this.props.tValue) / 10)
        {
            this.percentValue === 0 &&
            this.props.callback(this.percentValue)
        }
        {
            this.state.getTimeValue !== this.props.getTimeValue &&
            this.returnTime(this.percentValue)
        }

        return (
            <>
                {this.state.display &&
                <ProgressBar now={this.percentValue}/>}


            </>)
    }
}


export default DateTimerPercent