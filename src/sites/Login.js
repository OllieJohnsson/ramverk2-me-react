import React, { Component } from 'react';
import LoginForm from '../components/LoginForm';


class Login extends Component {
    constructor(props) {
        super(props);
        console.log(props.user.state);

        props.user.setState({
            hej: "hehe"
        })
        this.state = {
            title: "Logga in",
            user: props.user
        };
    }

    render() {
        return (
            <main>
            <LoginForm user={this.state.user}/>
            </main>
        );
    }
}

export default Login;
