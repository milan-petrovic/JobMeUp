import React from 'react';
import './App.scss';
import { BrowserRouter, Route, Router, Switch } from 'react-router-dom';
import { Navbar } from './components/Navbar/Navbar';
import { HomePage } from './containers/HomePages/HomePage';
import { EmployeeHomePage } from './containers/HomePages/EmployeeHomePage';
import { EmployeeProfile } from './containers/EmployeeProfile/EmployeeProfile';
import { EmployeeById } from './utils/Constants';

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <div className="App">
                <Switch>
                    <Route path="/" component={EmployeeHomePage} exact />
                    <Route path={EmployeeById} component={EmployeeProfile} exact />
                </Switch>
            </div>
        </BrowserRouter>
    );
}

export default App;
