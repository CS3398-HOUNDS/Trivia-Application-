import React, {Component} from "react";
import Button from 'react-bootstrap/Button';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import { Row, Col } from 'react-bootstrap';

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
    state = {
        loading: true,
        questionBank: [],
        // category: null,
        // correct_answer: null,
        // difficulty: null,
        // incorrect_answers: Array(3) [ null, null, null ],
        // question: null,
        // type: null,
        questions: [],
        score: 0,
        counter: 0,
        answerChoice: "",
        gameOver: false

    };

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
                    this.setState({questionBank : resp.results});
            })
            .catch((error) => {
                console.log(error, "catch the hoop")
            })
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.questionBank !== this.state.questionBank) {
            this.setState({questions: shuffle(this.state.questionBank[this.state.counter].incorrect_answers,this.state.questionBank[this.state.counter].correct_answer)})
            this.setState({loading: false})
        }
    }

    increment = () =>{
        let currentQuestion = this.state.counter;
        let currentScore = this.state.score;
        currentScore += calcScore(this.state.answerChoice,this.state.questionBank[currentQuestion].correct_answer);
        if(this.state.counter < 9) {
            currentQuestion += 1;
        }else{
            this.setState({gameOver: true})
        }
        let answers =shuffle(this.state.questionBank[currentQuestion].incorrect_answers,this.state.questionBank[currentQuestion].correct_answer);
        this.setState({counter : currentQuestion, score : currentScore, questions: answers,})
    };

    setAnswer = (event) =>{
        this.setState({answerChoice: event.target.value});
    }

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
                                    <Jumbotron className="question" style={{backgroundColor: "FloralWhite"}}>
                                        <h3>
                                            {this.state.questionBank[this.state.counter].question}
                                        </h3>
                                    </Jumbotron>

                                    <ToggleButtonGroup type="radio" name="options">

                                        <ToggleButton variant="success" onChange={this.setAnswer.bind(this)} value={this.state.questions[0]}>{this.state.questions[0]}</ToggleButton>

                                            <ToggleButton variant="success" onChange={this.setAnswer.bind(this)} value={this.state.questions[1]}>{this.state.questions[1]}</ToggleButton>

                                            <ToggleButton variant="success" onChange={this.setAnswer.bind(this)} value={this.state.questions[2]}>{this.state.questions[2]}</ToggleButton>

                                            <ToggleButton variant="success" onChange={this.setAnswer.bind(this)} value={this.state.questions[3]}>{this.state.questions[3]}</ToggleButton>

                                        </ToggleButtonGroup>

                                    <br/><br/><Button onClick={this.increment} variant="secondary">Next</Button>
                                </div>
                            ) : (
                                <div>
                                    {
                                        <p>
                                            You scored {this.state.score/10*100} out of 100!
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
