import React, { Component } from 'react';
import Markdown from 'react-markdown';


class Reports extends Component {
    constructor(props) {
        super(props);
        this.state = {
            kmom: props.kmom,
            questions: []
        }
    };

    componentDidMount() {
        fetch(`https://me-api.olliej.me/reports/${this.state.kmom}`)
        // fetch(`localhost:8333/reports/${this.state.kmom}`)
        .then((response) => {
            return response.json();
        }).then((json) => {
            let questions = json.data.map(x => {
                return (
                    <div className="question">
                        <h3>{x.question}</h3>
                        <Markdown source={x.answer} />
                    </div>
                )
            })
            this.setState({
                questions: questions
            });
        })
    }

    render() {
        console.log(this.state);
        return(
            <div className="main">
                {this.state.questions}
            </div>
        )
    }
}


export default Reports;
