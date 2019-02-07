import React, { Component } from 'react';
import '../style/FormButton.css';

class FormButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: props.title
        }
    }

    render() {
        return(
            <input className="formButton" type="submit" value={this.state.title} />
        );
    }
}

export default FormButton;
