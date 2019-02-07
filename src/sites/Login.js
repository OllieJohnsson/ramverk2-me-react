import React, { Component } from 'react';
import Title from '../components/Title';
import LoginForm from '../components/LoginForm';


class Login extends Component {
    render() {
        return (
            <main>
            <Title title="Logga in"/>
            <LoginForm token={this.props.token} onTokenReceived={this.props.onTokenReceived}/>
            </main>
        );
    }
}

export default Login;
