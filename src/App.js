import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import logo from './logo.svg';
import './style/App.css';
import './style/Home.css';
import './style/Report.css';

import Home from './sites/Home.js';
import Report from './sites/Report.js';



class App extends Component {
    render() {
        return (
            <Router>
              <div className="App">
                <nav>
                  <ul>
                    <li><Link to="/">Hem</Link></li>
                    <li><Link to="/reports/kmom01">Kmom01</Link></li>
                    <li><Link to="/reports/kmom02">Kmom02</Link></li>
                  </ul>
                </nav>
                <Route exact path="/" component={Home} />
                <Route path="/reports/:kmom" component={Report} />
              </div>
            </Router>
        );
    }
}

export default App;
