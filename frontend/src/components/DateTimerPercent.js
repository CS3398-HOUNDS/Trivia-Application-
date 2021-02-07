import React, {useState} from "react";
import ReactDOM from "react-dom";

class DateTimerPercent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            targetDate: new Date().getTime() + (this.props.tValue * 1000),
            remainingSeconds: this.props.tValue * 1000,
            resetValue: ""
        }
<<<<<<< HEAD
        let percentValue;
        let displayPercent;
=======
>>>>>>> parent of 0427c7cd... Cleaned code, pushing before major edits for rollback safety
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
        this.setState({targetDate: new Date().getTime() + (this.props.tValue * 1000),
            remainingSeconds: this.props.tValue * 1000, resetValue: this.props.resetValue})

    };
    makeZero(){
        this.setState({remainingSeconds: 0})
    }


    render() {
        {this.state.remainingSeconds > 0 &&
        this.countItDown()
        }
        {this.state.resetValue !== this.props.resetValue &&
        this.resetTimer()
        }
<<<<<<< HEAD
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
            this.state.getTimeValue !== this.props.getTimeValue && this.props.getTimeValue !== null &&
            (this.percentValue === 100 ?
                    this.returnTime(null)
                    :
                this.returnTime(this.percentValue))
=======
        {this.state.remainingSeconds < 0 &&
        this.makeZero()
>>>>>>> parent of 0427c7cd... Cleaned code, pushing before major edits for rollback safety
        }
        if(this.percentValue < 75)
            this.displayPercent = this.percentValue + 25
        else
            this.displayPercent = 100


        return (
            <>
<<<<<<< HEAD
                {this.props.display &&
                <ProgressBar
                    now={this.percentValue}
                    label={Math.round((this.displayPercent * this.props.maxPointsForQuestion) / 100)}/>}


=======
                {Math.round((this.state.remainingSeconds/this.props.tValue)/10)}
>>>>>>> parent of 0427c7cd... Cleaned code, pushing before major edits for rollback safety
            </>)
    }
}


export default DateTimerPercent