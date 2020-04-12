import React, {Component} from "react";
import Button from 'react-bootstrap/Button';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import MCBlock from './MCBlock'
import TFBlock from './TFBlock'
import Col from "react-bootstrap/Col";
import Timer from "./Timer";
import Row from "react-bootstrap/Row";

class DisplayAnswer extends React.Component{

    constructor(props) {
        super(props);
        this.state=({
                timerDone: false
            }
        )
        //this.grats = ["Nice!", "Correct!", "Bingo!", "Excellent!", "Yahtzee!", "Grats!", "Good work!"]
        console.log(this.props)
        this.nextQuestion = this.nextQuestion.bind(this)
    }
    nextQuestion(){
        this.setState({timerDone: true})
    }
    render(){
        let newScore = this.props.score;
        let points = this.props.points;
        let correct = this.props.correct;
        let questionsLeft = this.props.questionsLeft
        //let randomIndex = Math.floor(Math.random()*7);
        //let goodJob = this.grats[randomIndex]
        if(newScore < 0){newScore = 0}
        if(correct){
            newScore += points
        }
        if(this.state.timerDone){
            this.props.startNextQuestion(newScore, points)
        }
        return(
            <div>
                {correct ? <h3> Nice!<b> You earned +{points} </b> points!</h3>: <h3>Sorry!</h3>}
            <h4>
                <Timer
                    display={false}
                    tValue={12}
                    timeEndCallback = {this.nextQuestion}
                /></h4>
                {questionsLeft > 0 ?
                    <Button
                        variant={"secondary"}
                        onClick={() => {
                            this.props.startNextQuestion(newScore, points)
                        }}
                    > Next Question</Button>
                    :
                    <Button
                        variant={"secondary"}
                        onClick={() => {
                            this.props.startNextQuestion(newScore, points)
                        }}
                    > Get Results!</Button>
                }
            </div>
        )
    }
}



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


class TriviaGame extends Component{
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            questionBank: [],
            maxScore: 0,
            gameDifficulty: 0,
            questions: [],
            //Score set to -1 to differentiate between a score of 0 and not having a score yet without using null
            score: -1,
            counter: 0,
            answerChoice: "",
            gameOver: false,
            displaying: 0 //switches between displaying the question (0) and the correct answer (1)
        };
        this.setA = this.setA.bind(this)
        this.setTF = this.setTF.bind(this)
        this.displayQuestion = this.displayQuestion.bind(this)
        this.toggleQA = this.toggleQA.bind(this)
    }
    display = null;

    async componentDidMount(){
        var self = this;
        //DO NOT REMOVE THIS LINE

        let response =  fetch(this.props.requestUrl, {
            method: "GET",
            dataType: "JSON",
            ContentType: "charset=url3986"
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
            });

        //Sets the game difficulty multiplier for score (1: 10secs, 1/2: 20secs, 1/60:60secs)
        if (this.state.timer !== 0){
            this.setState({gameDifficulty : 1/(this.state.timer/10)})
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.questionBank !== this.state.questionBank) {
            //TF questions don't have incorrect answers to shuffle

            if(this.state.type==="multiple"){
                this.setState({questions: shuffle(this.state.questionBank[this.state.counter].incorrect_answers,this.state.questionBank[this.state.counter].correct_answer)})}
            this.setState({loading: false});
            this.displayJumbo(decodeURIComponent(this.state.questionBank[0].question))
        }
    }

    getQuestion(num){
        return this.state.questionBank[num].question
    }

    getCorrect(num){
        return this.state.questionBank[num].correct_answer
    }

    determineCorrect(myAnswer,Answer){
        if(myAnswer === Answer){
            return true;
        }
        return false;
    }

    calcPointValue (currentQuestion){
        if(this.state.questionBank[currentQuestion].difficulty === "easy"){
            return 100
        }else if (this.state.questionBank[currentQuestion].difficulty === "medium"){
            return 500
        }else{
            return 1000
        }

    }

    displayQuestion(newScore, points){
        let currentQuestion = this.state.counter;
        let currentMax = this.state.maxScore  + points;
        if(currentQuestion < this.state.maxQuestions) {
            currentQuestion += 1;
        }else{
            this.setState({gameOver: true})
        }
        //TF questions do not have incorrect answers to shuffle
        if(this.state.type==="multiple") {
            let answers = shuffle(this.state.questionBank[currentQuestion].incorrect_answers, this.state.questionBank[currentQuestion].correct_answer);
            this.setState({counter: currentQuestion, score: newScore, maxScore: currentMax, questions: answers})
            this.toggleQA()
        }else{
            this.setState({counter: currentQuestion, score: newScore, maxScore: currentMax})
            this.toggleQA()
        }
        this.displayJumbo(decodeURIComponent(this.state.questionBank[currentQuestion].question))
    }

    toggleQA(){
        if(this.state.displaying === 0){
            this.setState({displaying: 1})
        }else{
            this.setState({displaying: 0})
        }
    }

    setTF(value){
        this.setState({answerChoice: value});
    }

    setA(value) {
        this.setState({answerChoice: this.state.questions[value]});
    };

    displayJumbo(obj){
        this.display = obj;
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
                                    <div align={"left"}>
                                        <Row>
                                        <Col>
                                        <h1>Question <b>{this.state.counter + 1}</b> out of <b>{this.props.maxQuestions}</b></h1>
                                        {this.state.score > 0 ? (<h4> score:  {this.state.score} </h4>) : <h4>score:  ---</h4>}
                                        </Col>
                                        <Col>
                                            {this.state.timer > 0 ? <h4>time left</h4> : null}
                                            {this.state.timer > 0 ? <Timer
                                                tValue={this.props.timer}
                                                display={true}
                                                reset={this.state.counter}
                                                timeEndCallback={()=>this.toggleQA()}/>: null}

                                            </Col>
                                        </Row>
                                    </div>

                                    <Jumbotron className="question align-items-center" style={{backgroundColor: "FloralWhite"}}>
                                        <h2>
                                            {this.state.displaying === 0 ?
                                                this.display
                                                : <DisplayAnswer
                                                    score = {this.state.score}
                                                    questionsLeft = {this.state.maxQuestions - this.state.counter}
                                                    points = {this.calcPointValue(this.state.counter)}
                                                    correct = {this.determineCorrect(this.state.answerChoice, this.getCorrect([this.state.counter]))}
                                                    correctAnswer ={this.getCorrect(this.state.counter)}
                                                    startNextQuestion = {this.displayQuestion}/>}
                                        </h2>
                                    </Jumbotron>
                                    {/* This block renders the appropriate answer selection*/ }
                                    {this.state.type==="multiple" ?
                                        <MCBlock
                                            questions={this.state.questions}
                                            answerCallback={this.setA}
                                            answerDisplay = {this.state.displaying}
                                            correctAnswer = {this.getCorrect(this.state.counter)}/>
                                    :
                                        <TFBlock
                                            counter={this.state.counter}
                                            answerCallback={this.setTF}/>}
                                    {/*counter must be passed to TF even though it does not use then, because it resets the selection*/}
                                    <br/>
                                    {this.state.timer === 0 && this.state.displaying === 0? <Button onClick={()=>{this.toggleQA()}} variant="secondary">Next</Button> : null}

                                </div>

                            ) : (
                                <div>
                                            <h1>You scored {this.state.score} out of {(this.state.maxScore)}!</h1>
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
