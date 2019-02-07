import React, { Component } from 'react';
import '../style/Input.css';

import Button from 'react-bootstrap/Button';

class Input extends Component {
    render() {
        return(
            <label>
            <input name={this.props.name} placeholder={this.props.placeholder} type={this.props.type} value={this.props.value} onChange={this.props.handleChange} />
            <Button variant="primary">Primary</Button>
            </label>

        );
    }
}

export default Input;
