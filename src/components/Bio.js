import React, { Component } from 'react';


class Bio extends Component {
    constructor(props) {
        super(props);
        console.log(props.title);
        this.state = {
            title: props.title,
            description: props.description
        };
    }
    render() {
        return(
            <div className="bio">
            <h1>{this.state.title}</h1>
            <p>{this.state.description}</p>
            </div>
        )
    }
}

export default Bio;
