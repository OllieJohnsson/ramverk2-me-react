import React, { Component } from 'react';

const home = require('../sites/Home');

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
        };


        console.log(props.user.state);

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
            this.setState({
                token: json.token
            })
            console.log(this.state);


            // this.props.user.setState({
            //     email: this.state.email,
            //     token: json.token
            // });

            console.log(home.getState());

            console.log(this.props.user);
        })
    }

    handleRedirect(status, res) {

        console.log(status);
        if( res.status === 200 ){
            console.log("success");
            // redirect here

            this.setState({
                token: "hej"
            })

            console.log(this.state);

        } else {
            console.log("fail");
          // Something went wrong here
        }
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
            <label>
            Email:
            <input type="email" name="email" value={this.state.email} onChange={this.handleChange} />
            </label>
            <label>
            Password:
            <input type="password" name="password" value={this.state.password} onChange={this.handleChange} />
            </label>
            <input type="submit" value="Submit" />
            </form>
        );
    }
}

export default LoginForm;
