import React, { Component } from 'react';
import Title from '../components/Title';
import Bio from '../components/Bio';

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: "Apa",
            description: "hehhehehhee"
        };
    }

    render() {
        return (
            <main>
            <Title title={this.state.title} />

            <Bio title={this.state.title} description={this.state.description} />
            </main>
        );
    }
}

export default Home;
