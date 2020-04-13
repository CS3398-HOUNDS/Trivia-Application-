import React from "react";
import ProgressBar from 'react-bootstrap/ProgressBar';
import '../style.css'


//USING A TIMER:
//a Timer accepts these things passed to it as props:

//  -tValue: The start time in seconds, ESSENTIAL
//  -reset: a prop from the parent that when updated in the parent will reset the countdown
//  -display: accepts {true} or {false}, if turned on the component will actually render on screen, false is default
//  -some callback you assign: will be called when the timer runs out, does not need to be passed but
//      does -MUST BE PASSED- as timeEndCallback and have no parameters



class Timer extends React.Component {
    constructor(props) {
        super(props);
        this.state = { time: {}, seconds: this.props.tValue };
        this.maxTime = this.props.tValue;
        this.timer = 0;  //the actual timer _component_
        this.startTimer = this.startTimer.bind(this);
        this.countDown = this.countDown.bind(this);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.reset !== this.props.reset){
            clearInterval(this.timer);
            let timeLeftVar = this.props.tValue;
            this.setState({seconds: timeLeftVar });
            this.timer = setInterval(this.countDown, 1000);
        }
    }

    componentDidMount() {
        this.startTimer()
    }

    startTimer() {
        if (this.timer === 0 && this.state.seconds > 0) {
            this.timer = setInterval(this.countDown, 1000);
        }
    }

    countDown() {
        // Remove one second, set state so a re-render happens.
        let seconds = this.state.seconds - 1;
        this.setState({
            seconds: seconds,
        });

        // Check if we're at zero.
        if (seconds <= 0) {
            clearInterval(this.timer);
            if(this.props.timeEndCallback)
                this.props.timeEndCallback();
        }
    }

    barColor(){
        if(this.state.seconds > (this.maxTime/2) ){    //greater than 50% the time left is green
            return "success";
        } else if(this.state.seconds > (this.maxTime/4)){   //gretaer than 25% of the time and < 50% time is yellow
            return "warning";
        } else {    //less than 25% time is red
            return "danger";
        }
    }

    render() {
        return(
            <div>
                <ProgressBar animated variant={this.barColor()} label={this.state.seconds} now={this.state.seconds} max={this.maxTime} />
            </div>
        );
    }
}


export default Timer;
