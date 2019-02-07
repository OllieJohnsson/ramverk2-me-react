import React, { Component } from 'react';
import ReportForm from '../components/ReportForm';
import Title from '../components/Title';


class AddReport extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <main>
            <Title title="Lägg till redovisningstext" />
            <ReportForm token={this.props.token} kmoms={this.props.kmoms}/>
            </main>
        );
    }
}

export default AddReport;
