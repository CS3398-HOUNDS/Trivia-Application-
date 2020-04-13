import React from "react";
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';

class Leaderboard extends React.Component {
  constructor(props) {
    super(props);
    //Note(Trevor): I'll fix this later, learning how to get these talking.
    //let url = https://my-json-server.typicode.com/CS3398-HOUNDS/API/Leaderboard;i
    //let leaders = $.get(URL,data,function(data,status,xhr),dataType)
  }

  render() {
    return(
      <Container>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Username</th>
              <th>Wins</th>
              <th>Losses</th>
              {/*<th>Win/Lose Ratio</th>*/}
              <th>Total Score</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>1</th>
              <th>BigBrain</th>
              <th>10215</th>
              <th>1514</th>
              {/*<th>Win/Lose Ratio</th>*/}
              <th>159700</th>
            </tr>
            <tr>
              <th>2</th>
              <th>ThunderDome</th>
              <th>9715</th>
              <th>2032</th>
              {/*<th>Win/Lose Ratio</th>*/}
              <th>123000</th>
            </tr>
            <tr>
              <th>3</th>
              <th>TheWokenOne</th>
              <th>6215</th>
              <th>1445</th>
              {/*<th>Win/Lose Ratio</th>*/}
              <th>101200</th>
            </tr>
            <tr>
              <th>4</th>
              <th>Ned</th>
              <th>4925</th>
              <th>2540</th>
              {/*<th>Win/Lose Ratio</th>*/}
              <th>98500</th>
            </tr>
            <tr>
              <th>5</th>
              <th>Alex</th>
              <th>1215</th>
              <th>134</th>
              {/*<th>Win/Lose Ratio</th>*/}
              <th>92500</th>
            </tr>
          </tbody>
        </Table>
      </Container>
    );
  }
}

export default Leaderboard;
