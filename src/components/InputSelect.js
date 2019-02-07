import React, { Component } from 'react';
import '../style/InputSelect.css';

class InputSelect extends Component {

    render() {
        const options = this.props.options.map(option => {
            return <option value={option.slice(-2)} key={option} >{option[0].toUpperCase() + option.slice(1)}</option>;
        });
        return(
            <select name={this.props.name} onChange={this.props.handleChange}>
            {options}
            </select>
        );
    }
}

export default InputSelect;
