import React, {Component} from "react";
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';

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
    };

    async componentDidMount(){
        const url = "https://opentdb.com/api.php?amount=10&category=20&type=multiple";
        //const url = "http://127.0.0.1:8000/api/1/";
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        this.setState({questionBank: data.results, loading: false});
    }

    render(){
        return(
            <Container>
                <div className="title"></div>
                    <Button>Next Question -></Button>
                    <center>
                    {this.state.loading || !this.state.questionBank ? (
                        <div>Loading question...</div>
                    ) : (
                        <div>
                        <Jumbotron>
                        <h3>
                        {this.state.questionBank[0].question}
                        </h3>
                        </Jumbotron>
                        <ButtonGroup toggle='true' horizontal='true' size='lg'>
                            <Button >{this.state.questionBank[0].incorrect_answers[0]}</Button>
                            <Button >{this.state.questionBank[0].incorrect_answers[1]}</Button>
                            <Button >{this.state.questionBank[0].incorrect_answers[2]}</Button>
                            <Button >{this.state.questionBank[0].correct_answer}</Button>
                        </ButtonGroup>
                        </div>
                    )}
                    </center>
            </Container>
        )
    }
}

export default TriviaGame;
