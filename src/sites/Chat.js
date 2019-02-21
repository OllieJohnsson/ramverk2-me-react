import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Title from "../components/Title";

import '../style/Chat.css';


class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            connected: false,
            title: "Chat",
            nickname: "",
            message: "",
            websocket: null,
            log: [],
            url: "wss://chat.olliej.me"
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleConnect = this.handleConnect.bind(this);
        this.handleSend = this.handleSend.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.log = this.log.bind(this);
    }


    log(message) {
        this.setState({
            log: [...this.state.log, message]
        });
    }
        // let now = new Date();
        // let timestamp = now.toLocaleTimeString();

        // if (data.hasOwnProperty("nick")) {
            // this.setState({
            //     log: "ha"
            // });


            // output.innerHTML += `<div class="message">
            //     <div class="timeStamp">${timestamp}</div>
            //     <div class="nick">${data.nick}</div>
            //     <div class="text">${data.message}</div>
            // </div>`;
        // }

        // else {
        //     output.innerHTML += `<div class="message">
        //         <div class="timeStamp">${timestamp}</div>
        //         <div class="text">${data}</div>
        //     </div>`;
        // }


        // output.scrollTop = output.scrollHeight;
    // }

    // outputLog(output) {
    //     this.setState({log: [...this.state.log, output]});
    // }


    handleChange(event) {
        event.preventDefault();
        this.setState({
            [event.target.name]: event.target.value
        });
    };


    scrollToBottom() {
        let log = document.getElementById("log");
        log.scrollTop = log.scrollHeight;
    }


    handleConnect(event) {
        event.preventDefault();

        if (!this.state.nickname) {
            return console.log("You need to enter a name");
        }

        let chat = this;

        // let websocket = new WebSocket("ws://localhost:1337", "json");
        let websocket = new WebSocket(this.state.url, "json");
        websocket.onopen = function () {
            let data = {
                timestamp: Date(),
                message: `You connected as ${chat.state.nickname}!`
            };
            chat.log(JSON.stringify(data));

            data.message = `${chat.state.nickname} connected to the chat`;
            websocket.send(JSON.stringify(data));
            chat.setState({connected: true})
            document.getElementById("message").focus();
        }



        websocket.onmessage = function(message) {
            chat.log(message.data);
        }

        websocket.onclose = function() {
            console.log("closed");
            chat.log(JSON.stringify({
                timestamp: Date(),
                message: "You closed the connection"}
            ));
            chat.setState({connected: false});
        }



        this.setState({
            websocket: websocket
        });
    }



    handleSend(event) {
        event.preventDefault();
        if (!this.state.message) {
            return console.log("You need to enter a message!");
        }

        if (!this.state.websocket || this.state.websocket.readyState === 3) {
            console.log("The websocket is not connected to a server.");
        } else {
            let data = {
                timestamp: Date(),
                nickname: this.state.nickname,
                message: this.state.message
            };
            this.state.websocket.send(JSON.stringify(data));
            console.log("Sending message: " + this.state.message);

            data.nickname = null;
            data.message = `You said: ${data.message}`;
            this.log(JSON.stringify(data));
            // outputLog("You said: " + messageText);
            this.setState({
                message: ""
            });
            document.getElementById("message").focus();
        }
    }



    handleClose(event) {
        event.preventDefault();
        this.state.websocket.close();
    }


    componentDidMount() {
        document.getElementById("connect").focus();
    }

    componentDidUpdate() {
        this.scrollToBottom();
    }



    render() {
        let messages = this.state.log.map((message, index) => {
            let obj = JSON.parse(message);
            let date = new Date(obj.timestamp)

            return (
                <div className="logMessage" key={index}>
                    <div className="logTimestamp">{ date.toLocaleTimeString() }</div>
                    <div className="logUser">
                    {obj.nickname ? <div className="logNickname">{"@" + obj.nickname + ": "}</div> : null}
                    <div className="logText">{ obj.message }</div>
                    </div>
                </div>
            );
        });



        return (
            <main>
            <Title title="Chat"></Title>

            <Form.Control type="text" placeholder="URL" name="url" value={this.state.url} onChange={this.handleChange} />

            <Form inline onSubmit={ this.state.connected ? this.handleClose : this.handleConnect}>
                <Form.Group controlId="connect">
                    <Form.Control style={{marginBottom: "0"}} type="text" placeholder="Nickname" name="nickname" value={this.state.nickname} onChange={this.handleChange} />
                    <Form.Control type="submit" value={ this.state.connected ? "Disconnect" : "Connect" } />
                </Form.Group>
            </Form>
            <Form inline onSubmit={this.handleSend}>
                <Form.Group controlId="message">
                    <Form.Control autocomplete="off" style={{marginBottom: "0"}} type="text" placeholder="Message" name="message" value={this.state.message} onChange={this.handleChange} />
                    <Form.Control type="submit" value="Send" />
                </Form.Group>
            </Form>

            <div id="log">{ messages }</div>

            </main>
        );
    }
}

export default Chat;
