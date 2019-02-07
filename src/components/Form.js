import React, { Component } from 'react';
import '../style/Form.css';

class Form extends Component {
    render() {
        return(
            <form onSubmit={this.props.handleSubmit}>
            </form>
        );
    }
}

export default Form;
