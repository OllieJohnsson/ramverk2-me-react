import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
// import logo from './logo.svg';
import './style/App.css';
import './style/Home.css';
import './style/Report.css';

import Home from './sites/Home.js';
import Report from './sites/Report.js';
// import AddReport from './sites/AddReport.js';
// import Login from './sites/Login.js';

// import User from './components/User.js';



class App extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         user: new User()
    //     };
    //
    //     this.state.user.componentDidMount();
    // }
    render() {
        return (
            <Router>
              <div className="App">
                <nav>
                  <ul>
                    <li><Link to="/">Hem</Link></li>
                    <li><Link to="/reports/kmom01">Kmom01</Link></li>
                    <li><Link to="/reports/kmom02">Kmom02</Link></li>
                    {/* <li><Link to="/report/add">Lägg till</Link></li> */}
                    {/* <li><Link to="/login">Logga in</Link></li> */}
                  </ul>
                </nav>
                <Route exact path="/" component={Home} />
                <Route path="/reports/:kmom" component={Report} />
                {/* <Route path="/report/add" render={(props) => <AddReport {...props} user={this.state.user} />} /> */}
                {/* <Route path="/login" render={(props) => <Login {...props} user={this.state.user} />} /> */}

              </div>
            </Router>
        );
    }
}

export default App;
