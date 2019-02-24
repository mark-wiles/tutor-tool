import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import AddressEdit from './Addresses/AddressEdit';
import AddressNew from './Addresses/AddressNew';
import LessonEdit from './Lessons/LessonEdit';
import LessonNew from './Lessons/LessonNew';
import Lesson from './Lessons/Lesson';
import Lessons from './Lessons/Lessons';
import Messages from './Messages';
import NavbarBottom from './NavbarBottom';
import NoteNew from './Notes/NoteNew';
import NoteEdit from './Notes/NoteEdit';
import Student from './Students/Student';
import StudentEdit from './Students/StudentEdit';
import StudentNew from './Students/StudentNew';
import Students from './Students/Students';
import StudentsInactive from './Students/StudentsInactive';
import Earnings from './Earnings/Earnings';
import Settings from './Settings';


export default class App extends Component {
    render() {
        return (
            <Router>
                <div className="app-container col-sm-12">

                    <Switch>
                        <Route exact path="/home" component={Students} />
                        <Route exact path="/address/edit/:id" component={AddressEdit} />
                        <Route exact path="/address/new/:id" component={AddressNew} />
                        <Route exact path="/lesson/edit/:id" component={LessonEdit} />
                        <Route exact path="/lesson/new" component={LessonNew} />
                        <Route exact path="/lesson/:id" component={Lesson} />
                        <Route exact path="/lessons" component={Lessons} />
                        <Route exact path="/messages" component={Messages} />
                        <Route exact path="/note/edit/:id" component={NoteEdit} />
                        <Route exact path="/note/new/:id" component={NoteNew} />
                        <Route exact path="/earnings" component={Earnings} />
                        <Route exact path="/settings" component={Settings} />
                        <Route exact path="/student/edit/:id" component={StudentEdit} />
                        <Route exact path="/student/new" component={StudentNew} />
                        <Route exact path="/student/:id" component={Student} />
                        <Route exact path="/students/inactive" component={StudentsInactive} />
                        <Route path="*" component={Students} />
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
