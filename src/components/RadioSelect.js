import React, { Component } from 'react';

import Form from 'react-bootstrap/Form';


class RadioSelect extends Component {
    constructor(props) {
        super(props);
        this.changeValue = this.changeValue.bind(this);
    }

    changeValue(e) {
        this.props.handleChangeAction(e.target.id);
    }


    render() {
        const options = this.props.options.map(x => {
            return (
                <Form.Check inline checked={this.props.checked === x} type="radio" id={x} label={x} onChange={this.changeValue}/>
            );
        });
        return(

            <div>
            {options}
            </div>

        );
    }
}


export default RadioSelect;
