import React, {Component} from 'react';

class Devtest extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

        render(){
            // invoke the callback on buttonclick
            return (<button onClick={()=>this.props.triggerUserUpdate("Dev")}>Update user to Dev</button>

            )
        }
    }


export default Devtest
