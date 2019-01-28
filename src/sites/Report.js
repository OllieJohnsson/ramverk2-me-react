import React, { Component } from 'react';
import Markdown from 'react-markdown';
import Title from '../components/Title';


class Report extends Component {
    constructor(props) {
        super(props);
        this.initialState();
    }

    initialState() {
        this.state = {
            kmom: this.props.match.params.kmom,
            questions: [],
            message: ""
        };
    }

    componentWillMount() {
        this.loadData();
    }

    componentDidUpdate() {
        this.initialState();
        this.loadData();
    }

    loadData() {
        fetch(`https://me-api.olliej.me/reports/${this.state.kmom}`)
        .then((response) => {
            return response.json();
        }).then((json) => {
            this.setState({
                questions: json.data,
                message: json.message,
                errors: json.errors
            });
        })
    }

    render() {
        if (this.state.errors) {
            return (
                <main>
                <div className="question">
                <p>{ this.state.errors[0].status }</p>
                </div>
                </main>
            )
        }

        if (this.state.message) {
            return (
                <main>
                <div className="question">
                <p>{ this.state.message }</p>
                </div>
                </main>
            )
        }

        const questions = this.state.questions.map(x => {
            return (
                <div className="question">
                <h2>{x.question}</h2>
                <Markdown source={x.answer} />
                </div>
            )
        });
        return (
            <main>
            <Title title="Report" />
            { questions }
            </main>
        )
    }
}


export default Report;
