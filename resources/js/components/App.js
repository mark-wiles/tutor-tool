import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Lessons from './Lessons';
import Messages from './Messages';
import NavbarBottom from './NavbarBottom';
import Student from './Student';
import StudentEdit from './StudentEdit';
import StudentNew from './StudentNew';
import Students from './Students';
import Earnings from './Earnings';


export default class App extends Component {
    render() {
        return (
            <Router>
                <div className="app-container col-sm-12">

                    <Switch>
                        <Route exact path="/home" component={Students} />
                        <Route exact path="/student/edit/:id" component={StudentEdit} />
                        <Route exact path="/student/new" component={StudentNew} />
                        <Route exact path="/student/:id" component={Student} />
                        <Route exact path="/lessons" component={Lessons} />
                        <Route exact path="/messages" component={Messages} />
                        <Route exact path="/earnings" component={Earnings} />
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
