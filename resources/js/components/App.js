import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import LessonNew from './Lessons/LessonNew';
import Lessons from './Lessons/Lessons';
import Messages from './Messages';
import NavbarBottom from './NavbarBottom';
import Student from './Students/Student';
import StudentEdit from './Students/StudentEdit';
import StudentNew from './Students/StudentNew';
import Students from './Students/Students';
import Earnings from './Earnings/Earnings';


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
                        <Route exact path="/lesson/new" component={LessonNew} />
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
