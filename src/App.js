import React, { Component } from 'react';
import { Router, Route } from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import NavDropdown from 'react-bootstrap/NavDropdown';
import { LinkContainer } from 'react-router-bootstrap';

import history from './history'

import './style/App.css';
import './style/Home.css';
import './style/Report.css';


import Home from './sites/Home.js';
import Report from './sites/Report.js';
import AddReport from './sites/AddReport.js';
import Login from './sites/Login.js';
import Chat from './sites/Chat.js';



class App extends Component {
    constructor(props) {
        super(props);
        this.handleReceivedToken = this.handleReceivedToken.bind(this);
        this.logout = this.logout.bind(this);
        this.state = {
            token: JSON.parse(localStorage.getItem('token')) || null,
            isLoggedIn: false,
            kmoms: [
                "kmom01",
                "kmom02",
                "kmom03",
                "kmom04",
                "kmom05",
                "kmom06",
                "kmom10"
            ]
        };
    }

    handleReceivedToken(token) {
        this.setState({
            token: token,
            isLoggedIn: true
        }, () => {
            localStorage.setItem('token', JSON.stringify(this.state.token));
        });
        history.push("/");
    }

    componentDidMount() {
        this.checkIfLoggedIn();
    }

    checkIfLoggedIn() {
        fetch('https://me-api.olliej.me/isLoggedIn', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': this.state.token
            },
        }).then((res) => {
            if (res.status === 200) {
                return this.setState({
                    isLoggedIn: true
                });
            }
            this.setState({
                isLoggedIn: false
            });
        });
    }


    logout() {
        this.setState({
            token: null,
            isLoggedIn: false
        }, () => {
            localStorage.removeItem('token');
        });
    }

    render() {
        const loginLogoutButton = this.state.isLoggedIn ? <LinkContainer to="/login"><Nav.Link onClick={this.logout}>Logga ut</Nav.Link></LinkContainer> : <LinkContainer to="/login"><Nav.Link>Logga in</Nav.Link></LinkContainer>
        const addReportButton = this.state.isLoggedIn ? <LinkContainer to="/add/reports"><Nav.Link>Lägg till</Nav.Link></LinkContainer> : null;
        const kmomButtons = this.state.kmoms.map(kmom => {
            return(
                <LinkContainer to={`/reports/${kmom}`} key={kmom}>
                <NavDropdown.Item>{kmom[0].toUpperCase() + kmom.slice(1)}</NavDropdown.Item>
                </LinkContainer>
            );
        });

        return (
            <Router history={history}>
            <div className="App">

            <Navbar expand="lg">
            <Navbar.Brand href="#home"></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">

            <LinkContainer to="/">
            <Nav.Link>Hem</Nav.Link>
            </LinkContainer>

            <NavDropdown title="Redovisningar" id="basic-nav-dropdown">
            {kmomButtons}
            </NavDropdown>

            {addReportButton}
            {loginLogoutButton}

            <LinkContainer to="/chat">
            <Nav.Link>Chat</Nav.Link>
            </LinkContainer>

            </Nav>
            </Navbar.Collapse>
            </Navbar>
            <Route exact path="/" component={Home} />
            <Route path="/reports/:kmom" component={Report} />
            <Route path="/add/reports" render={(props) => <AddReport {...props} token={this.state.token} kmoms={this.state.kmoms} />} />
            <Route path="/login" render={(props) => <Login {...props} onTokenReceived={this.handleReceivedToken} />} />
            <Route path="/chat" component={Chat} />
            </div>
            </Router>
        );
    }
}


export default App;
