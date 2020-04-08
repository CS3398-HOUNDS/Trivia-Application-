import React, {Component} from "react";
import Button from 'react-bootstrap/Button';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';

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
    };

    async componentDidMount(){
        const url = "https://opentdb.com/api.php?amount=11&category=21&type=multiple";
        const response = await fetch(url); //put the selected option into here
        const data = await response.json();
        this.setState({questionBank: data.results, loading: false});
        this.setState({questions: shuffle(this.state.questionBank[this.state.counter].incorrect_answers,this.state.questionBank[this.state.counter].correct_answer)})
    }

    increment = () =>{
        this.setState({counter: this.state.counter + 1});
        this.setState({questions: shuffle(this.state.questionBank[this.state.counter+1].incorrect_answers,this.state.questionBank[this.state.counter+1].correct_answer)})
        this.setState({score: this.state.score + calcScore(this.state.answerChoice,this.state.questionBank[this.state.counter].correct_answer)})
    }

    setAnswer = (event) =>{
        this.setState({answerChoice: event.target.value});
    }

    render(){
        return(
            <Container>
                <div className="title"></div>
                    <center>
                    {this.state.loading || !this.state.questionBank ? (
                        <p>loading game...</p>
                    ) : (
                        <div>
                        { this.state.counter < 10 ? (
                        <div>
                                <Jumbotron>
                                <h3>
                                {this.state.questionBank[this.state.counter].question}
                                </h3>
                                </Jumbotron>
                                <ToggleButtonGroup type="radio" name="options">
                                    <ToggleButton onChange={this.setAnswer.bind(this)} value={this.state.questions[0]}>{this.state.questions[0]}</ToggleButton>
                                    <ToggleButton onChange={this.setAnswer.bind(this)} value={this.state.questions[1]}>{this.state.questions[1]}</ToggleButton>
                                    <ToggleButton onChange={this.setAnswer.bind(this)} value={this.state.questions[2]}>{this.state.questions[2]}</ToggleButton>
                                    <ToggleButton onChange={this.setAnswer.bind(this)} value={this.state.questions[3]}>{this.state.questions[3]}</ToggleButton>
                                </ToggleButtonGroup>
                                {console.log(this.state.score)}
                                <Button onClick={this.increment}>Next</Button>

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
