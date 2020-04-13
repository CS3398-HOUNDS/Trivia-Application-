import React, {Component, useEffect, useState} from "react";
import Button from 'react-bootstrap/Button';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import MCBlock from './MCBlock'
import TFBlock from './TFBlock'
import Col from "react-bootstrap/Col";
import Timer from "./Timer";
import Row from "react-bootstrap/Row";



function DisplayAnswer (props) {
    //(score, correct, points, questionsLeft, startNextQuestion)
    const usrWasCorrect = props.correct;
    const points = props.points;
    const questionsLeft = props.questionsLeft;
    const grats = ["Nice!", "Correct!", "Bingo!", "Excellent!", "Yahtzee!", "Grats!"]
    const shucks = ["Shucks...", "Darn...", "Breh...", "Bummer...", "Wiff...", "Bust..."]
    const goodJob = shuffle(grats,"Wicked!");
    const scold = shuffle(shucks, "Dang...");

    return(
        <div>

            {/*grats on correct answer, harsh scolding on incorrect answer*/}
            {usrWasCorrect ? <h3>{goodJob[0]} You earned <b>+{points}</b> points!</h3>: <h3>{scold[0]}</h3>}
            {/*On the last page, make a button to go to results*/}
            {questionsLeft === 0 &&
            <Button
                variant="primary"
                onClick={() => {
                    props.initNextQuestion()
                }}
            > Get Results!</Button>
            }
        </div>
    )
};

function shuffle(incorrect, correct){
    // stores all answer  choices into one array
    let array = incorrect;
    array.push(correct);

    // for testing
    if(correct !== "Wicked!" && correct !== "Dang...")
        console.log("correct answer is " + decodeURIComponent(correct));

    let currentIndex = array.length,
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
            score: 0,
            counter: 0,
            answerChoice: "",
            gameOver: false,
            displaying: 0 //switches between displaying the question (0) and the correct answer (1)
        };
        this.setA = this.setA.bind(this);
        this.setTF = this.setTF.bind(this);
        this.toggleQA = this.toggleQA.bind(this);
        this.setScore = this.setScore.bind(this)
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
        console.log(response);

        //Sets the game difficulty multiplier for score (1: 10secs, 1/2: 20secs, 1/60:60secs)

    }

    setScore(){
        //this.state.score,this.state.maxScore,this.determineCorrect(this.state.answerChoice, this.getCorrect([this.state.counter]))this.toggleQA()
        console.log("max Score " + this.state.maxScore );
        let crct = this.determineCorrect(this.state.answerChoice, this.getCorrect([this.state.counter]))
        let maxScore = this.state.maxScore
        let ptval = this.calcPointValue(this.state.counter)

        console.log(crct, maxScore, ptval)
        if(crct){
            this.setState({score: this.state.score + ptval, maxScore: maxScore + ptval})
        }else{
            this.setState({score: this.state.score, maxScore: maxScore + ptval})
        }
        this.toggleQA()
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.questionBank !== this.state.questionBank) {
            //TF questions don't have incorrect answers to shuffle

            if(this.state.type==="multiple"){
                this.setState({questions: shuffle(this.state.questionBank[this.state.counter].incorrect_answers,this.state.questionBank[this.state.counter].correct_answer)})
            }
            this.setState({loading: false});
            this.displayJumbo(decodeURIComponent(this.state.questionBank[0].question))
        }
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


    toggleQA(){
        //toggle the question and answer displays
        let currentQuestion = this.state.counter, displaying = this.state.displaying, gameover = false, answers = [];

        if(displaying === 0){
            displaying =  1;
            this.setState({displaying:displaying})
        }else {
            displaying = 0;

            //prevent going over the number of questions
            if (currentQuestion < this.state.maxQuestions) {
                currentQuestion += 1;
            } else {
                gameover = true;
            }
            //
            if (this.state.type === "multiple") {
                answers = shuffle(this.state.questionBank[currentQuestion].incorrect_answers, this.state.questionBank[currentQuestion].correct_answer);
            }
            this.setState({displaying: displaying, gameOver: gameover, counter: currentQuestion, questions: answers });
            this.displayJumbo(decodeURIComponent(this.state.questionBank[currentQuestion].question))
            this.forceUpdate();
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

    scoreMultiplier(max, timer){
        let p = 0;
        if (timer !== 0){
            p = (timer*100);
            p = 10000/p;
            p = Math.round(p);
            p=p*.2;
            if (p < .03){
                p = .28
            }
            p *= 100;
            p = Math.round(p)
        }   p /= 100;
        return p
    }

    DisplayResults(total, max, timer) {
        const s = this.scoreMultiplier(max, timer);
        let d;
        if (timer > 0){
            d =
                <div>
                    <h1>You scored {total} out of {max}!</h1>
                    <h3>Timer multiplier: <b>{s*10}0%</b></h3>
                    <h1>Total: <b>{s*total} points!</b></h1>
                    <br/>
                    <h1>Shorter timers, bigger multipliers!</h1>
                </div>
        }else{
            d =
                <div>
                    <h1>You scored {total} out of {max}!</h1>
                    <h3>Timer multiplier: <b>0%</b></h3>
                    <h1>Total: <b>{Math.round((s*total))} points!</b></h1>
                    <h1>Play with timers on to collect points! Shorter timers, bigger multipliers!</h1>
                </div>
        }
        return d
    }



    render(){

        return(
            <Container>
                <br/>
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
                                            {this.state.timer > 0 && this.state.displaying === 0 ? <h4>time left</h4> : null}
                                            {this.state.timer > 0 && this.state.displaying === 0 &&
                                                <Timer
                                                    tValue={this.props.timer}
                                                    display={true}
                                                    reset={this.state.counter}
                                                    timeEndCallback={this.toggleQA}/>
                                            }
                                            {this.state.displaying === 1 && this.state.counter < this.state.maxQuestions &&
                                                <Timer
                                                    display={true}
                                                    tValue={10}
                                                    reset={this.props.displaying}
                                                    timeEndCallback = {this.setScore}/>
                                            }


                                            </Col>
                                        </Row>
                                    </div>

                                    <Jumbotron className="question align-items-center" style={{backgroundColor: "FloralWhite"}}>
                                        <h2>
                                            {this.state.displaying === 0 ?
                                                this.display
                                                : <DisplayAnswer
                                                    score = {this.state.score}
                                                    correct = {this.determineCorrect(this.state.answerChoice, this.getCorrect([this.state.counter]))}
                                                    points = {this.calcPointValue(this.state.counter)}
                                                    questionsLeft = {this.state.maxQuestions - this.state.counter}
                                                    initNextQuestion= {this.toggleQA}
                                                    returnScores= {this.setScore}/>
                                            }
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
                                    <Container>
                                        <Row>
                                            <Col>
                                                <button style={{visibility:"hidden"}}/>
                                                {this.state.displaying === 0 &&
                                                <Button
                                                    onClick={()=>this.toggleQA()}
                                                    variant="secondary">
                                                    Submit
                                                    </Button>}
                                            </Col>
                                            <Col>
                                                {this.state.displaying === 1 && this.state.counter < this.state.maxQuestions ?
                                                    <Button
                                                        onClick={()=>{
                                                            this.setScore()
                                                        }}
                                                        variant="secondary">
                                                        Next
                                                    </Button>:""}
                                                <button style={{visibility:"hidden"}}/>
                                            </Col>
                                        </Row>
                                    </Container>
                                </div>

                            ) : (
                                <div>
                                    {this.DisplayResults(this.state.score, this.state.maxScore, this.state.timer)}
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
