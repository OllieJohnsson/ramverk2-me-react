import React, { Component } from 'react';
import '../style/Message.css';

class ErrorMessage extends Component {
    render() {
        const color = this.props.message ? '#60CE43' : '#ED4674';
        const messageStyle = {
            borderColor: color
        };
        const pStyle = {
            color: color
        };
        return(
            <div className="message" style={messageStyle}>
            <p style={pStyle}>{this.props.message || this.props.error}</p>
            </div>
        );
    }
}

export default ErrorMessage;
