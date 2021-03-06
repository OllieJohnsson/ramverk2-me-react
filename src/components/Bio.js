import React, { Component } from 'react';


class Bio extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: props.title,
            name: props.name,
            city: props.city,
            description: props.description
        };
    }

    render() {
        return(
            <div className="bio">
            <h1>{this.state.name}</h1>
            <p className="subtitle">{this.state.city}</p>
            <p>{this.state.description}</p>
            </div>
        )
    }
}

export default Bio;
