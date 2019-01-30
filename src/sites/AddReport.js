import React, { Component } from 'react';
import ReportForm from '../components/ReportForm';


class AddReport extends Component {
    constructor(props) {
        super(props);

        // console.log(props.user);
        this.state = {
            title: "Lägg till",
            kmom: props.match.params.kmom,
            user: props.user
        };
    }

    render() {
        return (
            <main>
            <ReportForm user={this.state.user}/>
            </main>
        );
    }
}

export default AddReport;
