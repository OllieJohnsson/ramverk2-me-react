import React, { Component } from 'react';
import Input from './Input';
import FormButton from './FormButton';
import Message from './Message';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import '../style/Form.css';

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            errorMessage: ""
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
        event.preventDefault();
        fetch("https://me-api.olliej.me/login", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password,
            })
        }).then(res => {
            return res.json();
        }).then(json => {
            if(!json.token) {
                return this.setState({
                    errorMessage: json.errors[0].detail
                });
            }
            this.setState({
                errorMessage: ""
            });
            this.props.onTokenReceived(json.token);
        })
    }

    render() {
        console.log(this.state);

        const message = this.state.errorMessage ? <Message error={this.state.errorMessage} /> : null;
        return (
            <Form onSubmit={this.handleSubmit}>
            <Form.Group controlId="login">
            <Form.Control type="email" placeholder="E-post" name="email" onChange={this.handleChange} />
            <Form.Control type="password" placeholder="Lösenord" name="password" onChange={this.handleChange} />
            </Form.Group>
            <Button type="submit">Logga in</Button>
            {message}
            </Form>
        );
    }
}

export default LoginForm;
