import React, { Component } from 'react';
import Title from '../components/Title';
import Bio from '../components/Bio';


class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: "Hem",
            name: "",
            city: "",
            description: "",
        };
    }

    componentWillMount() {
        this.loadData();
    }

    loadData() {
        fetch("https://me-api.olliej.me")
        .then((response) => {
            return response.json();
        }).then((json) => {
            this.setState({
                name: json.name,
                city: json.city,
                description: json.description
            });
        })
    }

    render() {
        if (!this.state.description || !this.state.name) {
            return <div />
        }

        return (
            <main>
            <Title title={this.state.title} />
            <Bio name={ this.state.name } city={ this.state.city } description={ this.state.description } />
            </main>
        );
    }
}

export default Home;
