import React, { Component } from 'react';
import '../style/Input.css';

class TextArea extends Component {
    render() {
        return(
            <label>
            <textarea name={this.props.name} placeholder={this.props.placeholder} type={this.props.type} value={this.props.value} onChange={this.props.handleChange} />
            </label>
        );
    }
}

export default TextArea;
