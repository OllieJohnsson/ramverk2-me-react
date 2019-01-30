import React, { Component } from 'react';

class ReportForm extends Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            question: "",
            answer: ""
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit(event) {
        alert('A report was submitted: ' + this.state.question + this.state.answer);



        event.preventDefault();

    }

    render() {
        return (
            <form method="post" action="https://me-api.olliej.me/reports">
            <label>
            Question:
            <input type="text" name="question" value={this.state.question} onChange={this.handleChange} />
            </label>
            <label>
            Answer:
            <textarea name="answer" value={this.state.answer} onChange={this.handleChange} />
            </label>
            <input type="submit" value="Submit" />
            </form>
        );
    }
}

export default ReportForm;
