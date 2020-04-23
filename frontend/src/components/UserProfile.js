import React from "react";
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import { Row, Col } from 'react-bootstrap';
import Button from "react-bootstrap/Button";

class UserProfile extends React.Component {
/* A GET request to /api/v1/profile/{id} will return this information about the user.
{
  "user": 0,
  "bio": "string",
  "location": "string",
  "birth_date": "2020-04-21",
  "score": 0,
  "rank": 0
}
*/
  constructor(props) {
    super(props);

    this.state = {
      username: this.props.name,
      bio: "",
      locale: "",
      score: -1,
      rank: -1
    };

    this.getUserInfo = this.getUserInfo.bind(this);
  }

  getUserInfo() {
    let token = this.props.token;
    let requestUrl = "http://klingons.pythonanywhere.com/api/v1/profile/" +
                      this.props.id;

    let response = fetch(requestUrl, {
      method: "GET",
      dataType: "JSON",
      headers: {
          "Authorization": token,
      }
    }).then((resp) => {
      return resp.json();
    }).then((resp) => {
      this.setState({
        bio: resp.bio,
        locale: resp["location"],
        score: resp.score,
        rank: resp.rank
      });
    }).catch((error) => {
      console.log(error, "Error in getUserInfo()");
    })
  }

  render() {
    this.getUserInfo();
    return(
      <Container>
        <Row>
          <Col>Username: {this.state.username}</Col>
          <Col>Score: {this.state.score}</Col>
          <Col>Rank: {this.state.rank}</Col>
        </Row>
        <Row>
          {/*<Col>{this.props.userIcon</Col>*/}
          <Col>{this.state.bio}</Col>
          <Col></Col>
        </Row>
      </Container>
    );
  }
}

export default UserProfile;
