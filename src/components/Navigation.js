import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from '../sites/Home.js';
import Report from '../sites/Report.js';

function Navigation() {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/reports/kmom01">Kmom01</Link>
          </li>
          <li>
            <Link to="/topics">Topics</Link>
          </li>
        </ul>

        <hr />

        <Route path="/" component={Home} />
        <Route path="/reports/:kmom" component={Report} />

      </div>
    </Router>
  );
};

export default Navigation;
