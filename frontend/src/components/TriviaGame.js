import React, {Component} from "react";
import Button from 'react-bootstrap/Button';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import MCBlock from './MCBlock'
import TFBlock from './TFBlock'

function shuffle(incorrect, correct){
    // stores all answer  choices into one array
    var array = incorrect;
    array.push(correct);

    // for testing
    console.log("correct answer is " + correct);

    var currentIndex = array.length,
        tempValue,
        randomIndex;

    while(0!==currentIndex){
        randomIndex = Math.floor(Math.random()*currentIndex);
        currentIndex -= 1;

        tempValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = tempValue;
    }
    return array;
}

function calcScore(myAnswer,Answer){
    if(myAnswer === Answer){
        return 1;
    }
    return 0;
}

class TriviaGame extends Component{
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            questionBank: [],
            // category: null,
            // correct_answer: null,
            // difficulty: null,
            // incorrect_answers: Array(3) [ null, null, null ],
            // question: null,
            // type: null,
            questions: [],
            //Score set to -1 to differentiate between a score of 0 and not having a score yet without using null
            score: -1,
            counter: 0,
            answerChoice: "",
            gameOver: false
        }
        this.setA = this.setA.bind(this)
        this.setTF = this.setTF.bind(this)
    }

    async componentDidMount(){

        var self = this;
        let response =  fetch(this.props.requestUrl, {
            method: "GET",
            dataType: "JSON",
            ContentType: 'application/json; charset=utf-16'
            })
            .then((resp) => {
                return resp.json();
            })
                .then((resp) => {
                    this.setState({
                        questionBank : resp.results,
                        maxQuestions : this.props.maxQuestions - 1,
                        timer: this.props.timer,
                        type: this.props.type});
            })
            .catch((error) => {
                console.log(error, "catch the hoop")
            })
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.questionBank !== this.state.questionBank) {
            //TF questions don't have incorrect answers to shuffle
            if(this.state.type==="multiple"){
                this.setState({questions: shuffle(this.state.questionBank[this.state.counter].incorrect_answers,this.state.questionBank[this.state.counter].correct_answer)})}
            this.setState({loading: false})
        }
    }

    increment = () =>{
        let currentQuestion = this.state.counter;
        let currentScore = this.state.score;
        if (this.state.score === -1){currentScore += 1}
        currentScore += calcScore(this.state.answerChoice,this.state.questionBank[currentQuestion].correct_answer);
        if(this.state.counter < this.state.maxQuestions) {
            currentQuestion += 1;
        }else{
            this.setState({gameOver: true})
        }

        //TF questions do not have incorrect answers to shuffle
        if(this.state.type==="multiple") {
            let answers = shuffle(this.state.questionBank[currentQuestion].incorrect_answers, this.state.questionBank[currentQuestion].correct_answer);
            this.setState({counter: currentQuestion, score: currentScore, questions: answers})
        }else{
            this.setState({counter: currentQuestion, score: currentScore})
        }
    };

    setTF(value){
        this.setState({answerChoice: value});
    }

    setA(value) {
        this.setState({answerChoice: this.state.questions[value]});
    };

    render(){

        return(
            <Container>
                <br/><br/>
                <div className="title"></div>
                <center>
                    {this.state.loading || this.state.questionBank === [] ? (
                        <p>loading game...</p>
                    ) : (
                        <div>
                            { !this.state.gameOver ? (
                                <div>
                                    <div align={"left"}>
                                        <h1>Question <b>{this.state.counter + 1}</b> out of <b>{this.props.maxQuestions}</b></h1>
                                        {this.state.score >= 0 ? (<h4> score:  {this.state.score * 100} </h4>) : <h4>score:</h4>}
                                    </div>

                                    <Jumbotron className="question align-items-center" style={{backgroundColor: "FloralWhite"}}>
                                        <h3>
                                            {this.state.questionBank[this.state.counter].question}
                                        </h3>
                                    </Jumbotron>
                                    {this.state.type==="multiple" ?
                                        <MCBlock questions={this.state.questions} answerCallback={this.setA}/>
                                    :
                                        <TFBlock  counter={this.state.counter} answerCallback={this.setTF}/>}
                                    {/*counter must be passed to TF even though it does not use then, because it resets the selection*/}
                                    <br/><Button onClick={this.increment} variant="secondary">Next</Button>

                                </div>

                            ) : (
                                <div>
                                    {
                                        <p>
                                            <h1>You scored {this.state.score * 100} out of {(this.state.maxQuestions + 1)*100}!</h1>
                                        </p>
                                    }
                                </div>
                            )}
                        </div>
                    )}
                </center>
            </Container>
        )
    }
}

export default TriviaGame;
