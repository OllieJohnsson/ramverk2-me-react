import React, { Component } from 'react';
// import Input from './Input';
// import TextArea from './TextArea';
// import FormButton from './FormButton';
// import InputSelect from './InputSelect';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import Message from './Message';
import RadioSelect from './RadioSelect';

import '../style/Form.css';




class ReportForm extends Component {
    constructor(props) {
        super(props);

        const actions = ["Lägg till", "Uppdatera"];
        this.state = {
            kmom: "",
            question: "",
            answer: "",
            questions: [],
            answers: [],
            message: "",
            error: "",
            actions: actions,
            chekedAction: actions[0]
        };

        this.handleChangeKmom = this.handleChangeKmom.bind(this);
        this.handleChangeAction = this.handleChangeAction.bind(this);
        this.handleChangeQuestionToEdit = this.handleChangeQuestionToEdit.bind(this);
        this.handleChangeQuestion = this.handleChangeQuestion.bind(this);
        this.handleChangeAnswer = this.handleChangeAnswer.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleChangeKmom(e) {
        this.setState({
            kmom: e.target.value,
            question: "",
            answer: "",
            questions: [],
            answers: [],
            chekedAction: "Lägg till"
        }, () => {
            this.loadReports();
        });
    }

    handleChangeAction(action) {

        this.setState({
            chekedAction: action,
            message: "",
            error: ""
        }, () => {
            switch (this.state.chekedAction) {
                case "Lägg till":
                    this.setState({
                        question: "",
                        answer: ""
                    });
                    break;
                case "Uppdatera":
                    this.loadReports();
                    break;
                default:
                    break;
            }
        });
    }

    handleChangeQuestionToEdit(e) {
        this.setState({
            question: e.target.value,
            answer: this.state.answers[e.target.selectedIndex],
            message: "",
            error: ""
        });
    }

    handleChangeQuestion(event) {
        this.setState({
            question: event.target.value,
            message: "",
            error: ""
        });
    }

    handleChangeAnswer(event) {
        this.setState({
            answer: event.target.value,
            message: "",
            error: ""
        });
    }



    loadReports() {
        fetch(`https://me-api.olliej.me/reports/kmom${this.state.kmom}`)
        .then((res) => {
            return res.json();
        }).then((json) => {
            const questions = json.data.map(x => {
                return x.question
            })
            const answers = json.data.map(x => {
                return x.answer
            })

            this.setState({
                questions: questions,
                answers: answers,
                question: this.state.chekedAction === "Uppdatera" ? questions[0] : "",
                answer: this.state.chekedAction === "Uppdatera" ? answers[0] : ""
            });
        });
    };

    handleSubmit(e) {
        e.preventDefault();
        switch (this.state.chekedAction) {
            case "Lägg till":
                this.addReport();
                break;
            case "Uppdatera":
                this.updateReport();
                break;
            default:
                break;
        }
    }


    addReport() {
        fetch("https://me-api.olliej.me/reports", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': this.props.token
            },
            body: JSON.stringify({
                kmom: this.state.kmom,
                question: this.state.question,
                answer: this.state.answer,
            })
        }).then(res => {
            return res.json();
        }).then(json => {
            this.setState({
                question: "",
                answer: "",
                message: json.message,
                error: json.errors ? json.errors[0].detail : ""
            });
        })
    }

    updateReport() {
        fetch("https://me-api.olliej.me/reports", {
            method: "PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': this.props.token
            },
            body: JSON.stringify({
                kmom: this.state.kmom,
                question: this.state.question,
                answer: this.state.answer,
            })
        }).then(res => {
            return res.json();
        }).then(json => {
            this.setState({
                question: "",
                answer: "",
                message: json.message,
                error: json.errors ? json.errors[0].detail : ""
            });
        })
    }





    render() {
        const message = this.state.message ? <Message message={this.state.message} /> : null;
        const errorMessage = this.state.error ? <Message error={this.state.error} /> : null;

        const kmoms = this.props.kmoms.map(kmom => {
            return <option value={kmom.slice(-2)} key={kmom} >{kmom[0].toUpperCase() + kmom.slice(1)}</option>;
        });

        const radioSelect = this.state.questions.length > 0 ? (
            <RadioSelect
                options={this.state.actions}
                checked={this.state.chekedAction}
                handleChangeAction={this.handleChangeAction}
            />
        ) : null;

        const questions = this.state.questions.map((question, index) => {
            return <option value={question} key={index}>{question}</option>;
        });

        const questionInput = this.state.chekedAction === "Lägg till" ? (
            <Form.Control type="text" placeholder="Fråga" name="question" value={this.state.question} onChange={this.handleChangeQuestion} />
        ): (
            <Form.Control as="select" name="editQuestions" onChange={this.handleChangeQuestionToEdit}>
            {questions}
            </Form.Control>
        );

        return (
            <Form onSubmit={this.handleSubmit}>
            <Form.Group controlId="report">
            <Form.Control as="select" name="kmom" onChange={this.handleChangeKmom}>
            <option disabled selected>Kmom</option>
            {kmoms}
            </Form.Control>

            {radioSelect}
            {questionInput}

            <Form.Control as="textarea" rows="3" placeholder="Svar" name="answer" value={this.state.answer} onChange={this.handleChangeAnswer} />
            </Form.Group>

            <Button variant="light" type="submit">
              {this.state.chekedAction}
            </Button>

            {message}
            {errorMessage}

            </Form>
        );
    }
}


export default ReportForm;
