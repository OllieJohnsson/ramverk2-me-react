import React, { Component } from 'react';
import Title from '../components/Title';
import Reports from '../components/Reports';

class Report extends Component {
    constructor(props) {
        super(props);
        this.state = {
            kmom: props.match.params.kmom
        };
    }

    render() {
      return (
          <main>
          <Title title="Report" />
          <Reports kmom={this.state.kmom}/>
          </main>
        )
    }
}


export default Report;
