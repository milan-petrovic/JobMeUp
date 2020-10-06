import React from 'react';
import { BrowserRouter, Route, Router, Switch } from 'react-router-dom';
import { Navbar } from './components/Navbar/Navbar';
import { HomePage } from './containers/HomePages/HomePage';
import { EmployeeHomePage } from './containers/HomePages/EmployeeHomePage';
import { EmployeeProfile } from './containers/EmployeeProfile/EmployeeProfile';
import { LoginPage } from './containers/LoginPage/LoginPage';
import { CompanyForm } from './containers/Company/CompanyForm';
import { EmployeeEditProfile } from './containers/EmployeeProfile/EmployeeEditProfile';
import { EmploymentForm } from './containers/Employment/EmploymentForm';
import { ProjectForm } from './containers/Project/ProjectForm';
import { EducationForm } from './containers/Education/EducationForm';
import { UserContextProvider } from './services/UserContext';
import { CompanyHomePage } from './containers/HomePages/CompanyHomePage';
import { routes } from './utils/Constants';

function App() {
    return (
        <UserContextProvider>
            <BrowserRouter>
                <Navbar />
                <div style={{ padding: '16px 10%' }}>
                    <Switch>
                        <Route path={routes.HOME} component={HomePage} exact />
                        <Route path={routes.EMPLOYEE_HOME} component={EmployeeHomePage} exact />
                        <Route path={routes.COMPANY_HOME} component={CompanyHomePage} exact />
                        <Route path={routes.EMPLOYEE_BY_ID} component={EmployeeProfile} exact />
                        <Route path={routes.LOGIN} component={LoginPage} exact />
                        <Route path={routes.COMPANY_NEW} component={CompanyForm} exact />
                        <Route path={routes.EDIT_PROFILE} component={EmployeeEditProfile} exact />
                        <Route path={routes.EMPLOYEE_NEW_EMPLOYMENT} component={EmploymentForm} exact />
                        <Route path={routes.EMPLOYEE_NEW_PROJECT} component={ProjectForm} exact />
                        <Route path={routes.EMPLOYEE_NEW_EDUCATION} component={EducationForm} exact />
                        <Route path-={routes.EMPLOYEE_EDIT_EDUCATION} component={EducationForm} exact />
                    </Switch>
                </div>
            </BrowserRouter>
        </UserContextProvider>
    );
}

export default App;
