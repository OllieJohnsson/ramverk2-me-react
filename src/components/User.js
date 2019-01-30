import React, { Component } from 'react';

class User extends Component {
    constructor(props) {
        super(props);
        console.log("constructor");
        this.state = {
            email: "",
            token: ""
        }

        this.getToken.bind(this);
    }

    getToken() {
        return this.state.token;
    }


    componentDidMount() {
        console.log("Mounted");
    }

    render() {
        return null;
    }


}


export default User;
