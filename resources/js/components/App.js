import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Lessons from './Lessons';
import NavbarBottom from './NavbarBottom';
import NavbarTop from './NavbarTop';
import Student from './Student';
import Students from './Students';


export default class App extends Component {
    render() {
        return (
            <Router>
                <div className="app-container col-sm-12">
                    <NavbarTop />

                    <Switch>
                        <Route exact path="/home" component={Students} />
                        <Route exact path="/student/:id" component={Student} />
                        <Route exact path="/lessons" component={Lessons} />
                    </Switch>

                    <NavbarBottom />
                </div>
            </Router>
        );
    }
}

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}
