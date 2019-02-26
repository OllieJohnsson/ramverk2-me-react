import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Title from "../components/Title";
import Message from "../components/Message";
import FormButton from "../components/FormButton";

import '../style/Chat.css';


class Chat extends Component {
    constructor(props) {
        super(props);

        let url = process.env.NODE_ENV === "development" ? "ws://localhost:1338" : "wss://chat.olliej.me";
        this.state = {
            connected: false,
            title: "Chat",
            nickname: "",
            message: "",
            websocket: null,
            log: [],
            url: url,
            error: null
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleConnect = this.handleConnect.bind(this);
        this.handleSend = this.handleSend.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.log = this.log.bind(this);
        this.saveLog = this.saveLog.bind(this)
        this.loadLog = this.loadLog.bind(this)
        this.clearLog = this.clearLog.bind(this)
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
        this.setState({error: null});
        if (!this.state.nickname) {
            this.setState({error: "You need to enter a name"});
            document.getElementById("connect").focus();
            return console.log("You need to enter a name");
        }

        let chat = this;
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
            let data = JSON.parse(message.data);

            if (data.type === "log") {
                let logStrings = data.log.map(x => {
                    return JSON.stringify(x);
                });
                chat.setState({log: logStrings});
                return;
            }

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

        websocket.onerror = function() {
            console.log("error");
        }


        console.log(websocket);
        this.setState({
            websocket: websocket
        });
    }



    handleSend(event) {
        event.preventDefault();
        this.setState({error: null});
        if (!this.state.message) {
            this.setState({error: "You need to enter a message!"});
            document.getElementById("message").focus();
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


    saveLog(event) {
        event.preventDefault();
        console.log("SAVE");
        let log = "[" + this.state.log.join(",") + "]";
        this.state.websocket.send(JSON.stringify({type: "save", nickname: this.state.nickname, log: log}));
    }

    loadLog(event) {
        event.preventDefault();
        console.log("LOAD");
        this.state.websocket.send(JSON.stringify({type: "load", nickname: this.state.nickname}));
    }

    clearLog(event) {
        event.preventDefault();
        this.setState({log: []});
    }

    render() {
        console.log(this.state);
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


        let errorMessage = this.state.error ? <Message error={this.state.error}/> : null;

        let saveButton = <button onClick={this.saveLog}>Save</button>;
        let loadButton = <button onClick={this.loadLog}>Load</button>;
        let clearButton = <button onClick={this.clearLog}>Clear</button>;

        return (
            <main>
            <Title title="Chat"></Title>

            <Form.Control id="url" type="text" placeholder="URL" name="url" value={this.state.url} onChange={this.handleChange} />

            <div id="userArea">
            <Form inline onSubmit={ this.state.connected ? this.handleClose : this.handleConnect}>
                <Form.Group controlId="connect">
                    <Form.Control autoComplete="off" style={{marginBottom: "0"}} type="text" placeholder="Nickname" name="nickname" value={this.state.nickname} onChange={this.handleChange} />
                    <Form.Control type="submit" value={ this.state.connected ? "Disconnect" : "Connect" } />
                </Form.Group>
            </Form>
            <Form inline onSubmit={this.handleSend}>
                <Form.Group controlId="message">
                    <Form.Control autoComplete="off" style={{marginBottom: "0"}} type="text" placeholder="Message" name="message" value={this.state.message} onChange={this.handleChange} />
                    <Form.Control type="submit" value="Send" />
                </Form.Group>
            </Form>
            </div>

            <div id="log">{ messages }</div>

            {saveButton}
            {loadButton}
            {clearButton}

            {errorMessage}

            </main>
        );
    }
}

export default Chat;
