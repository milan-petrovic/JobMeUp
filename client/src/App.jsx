import React from 'react';
import { BrowserRouter, Route, Router, Switch } from 'react-router-dom';
import { Navbar } from './components/Navbar/Navbar';
import { HomePage } from './containers/HomePages/HomePage';
import { EmployeeHomePage } from './containers/HomePages/EmployeeHomePage';
import { EmployeeProfile } from './containers/EmployeeProfile/EmployeeProfile';
import { EmployeeById } from './utils/Constants';
import { LoginPage } from './containers/LoginPage/LoginPage';
import { CompanyForm } from './containers/Company/CompanyForm';
import { EmployeeEditProfile } from './containers/EmployeeProfile/EmployeeEditProfile';
import { EmploymentForm } from './containers/Employment/EmploymentForm';
import { ProjectForm } from './containers/Project/ProjectForm';
import { EducationForm } from './containers/Education/EducationForm';
import { UserContextProvider } from './services/UserContext';
import { CompanyHomePage } from './containers/HomePages/CompanyHomePage';

function App() {
    return (
        <UserContextProvider>
            <BrowserRouter>
                <Navbar />
                <div style={{ padding: '16px 10%' }}>
                    <Switch>
                        <Route path="/" component={HomePage} exact />
                        <Route path="/employee/home" component={EmployeeHomePage} exact />
                        <Route path="/company/home" component={CompanyHomePage} exact />
                        <Route path={EmployeeById} component={EmployeeProfile} exact />
                        <Route path={'/login'} component={LoginPage} exact />
                        <Route path={'/companies/new'} component={CompanyForm} exact />
                        <Route path={'/edit-profile'} component={EmployeeEditProfile} exact />
                        <Route path={'/employee/:id/employments/new'} component={EmploymentForm} exact />
                        <Route path={'/employee/:id/projects/new'} component={ProjectForm} exact />
                        <Route path={'/employee/:id/educations/new'} component={EducationForm} exact />
                        <Route path-={'/employee/:id/educations/edit/:educationId'} component={EducationForm} exact />
                    </Switch>
                </div>
            </BrowserRouter>
        </UserContextProvider>
    );
}

export default App;
