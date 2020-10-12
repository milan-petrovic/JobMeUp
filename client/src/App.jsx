import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Navbar } from './components/Navbar/Navbar';
import { PrivateRoute } from './components/PrivateRoute/PrivateRoute';
import { CompanyForm } from './containers/Company/CompanyForm';
import { ContractsContainer } from './containers/ContractsContainer/ContractsContainer';
import { EducationForm } from './containers/Education/EducationForm';
import { EmployeeEditProfile } from './containers/EmployeeProfile/EmployeeEditProfile';
import { EmployeeProfile } from './containers/EmployeeProfile/EmployeeProfile';
import { EmployeeRegister } from './containers/EmployeeProfile/EmployeeRegister';
import { EmploymentForm } from './containers/Employment/EmploymentForm';
import { CompanyHomePage } from './containers/HomePages/CompanyHomePage';
import { EmployeeHomePage } from './containers/HomePages/EmployeeHomePage';
import { HomePage } from './containers/HomePages/HomePage';
import { JobOfferForm } from './containers/JobOffer/JobOfferForm';
import { JobOffersContainer } from './containers/JobOffer/JobOffersContainer';
import { LoginPage } from './containers/LoginPage/LoginPage';
import { ProjectForm } from './containers/Project/ProjectForm';
import { UserContextProvider } from './services/UserContext';
import { routes } from './utils/Constants';

function App() {
    return (
        <UserContextProvider>
            <BrowserRouter>
                <Navbar />
                <div style={{ padding: '16px 10%' }}>
                    <Switch>
                        <Route path={routes.HOME} component={HomePage} exact />
                        <Route path={routes.LOGIN} component={LoginPage} exact />
                        <Route path={routes.COMPANY_REGISTER} component={CompanyForm} exact />
                        <Route path={routes.EMPLOYEE_REGISTER} component={EmployeeRegister} exact />
                        <PrivateRoute path={routes.EMPLOYEE_HOME} component={EmployeeHomePage} exact />
                        <PrivateRoute path={routes.COMPANY_HOME} component={CompanyHomePage} exact />
                        <PrivateRoute path={routes.JOB_OFFER_NEW} component={JobOfferForm} exact />
                        <PrivateRoute path={routes.EMPLOYEE_BY_ID} component={EmployeeProfile} exact />
                        <PrivateRoute path={routes.EDIT_PROFILE} component={EmployeeEditProfile} exact />
                        <PrivateRoute path={routes.EMPLOYEE_NEW_EMPLOYMENT} component={EmploymentForm} exact />
                        <PrivateRoute path={routes.EMPLOYEE_EDIT_EMPLOYMENT} component={EmploymentForm} exact />
                        <PrivateRoute path={routes.EMPLOYEE_NEW_PROJECT} component={ProjectForm} exact />
                        <PrivateRoute path={routes.EMPLOYEE_EDIT_PROJECT} component={ProjectForm} exact />
                        <PrivateRoute path={routes.EMPLOYEE_NEW_EDUCATION} component={EducationForm} exact />
                        <PrivateRoute path={routes.EMPLOYEE_EDIT_EDUCATION} component={EducationForm} exact />
                        <PrivateRoute path={routes.JOB_OFFER_CONTAINER_EMPLOYEE} component={JobOffersContainer} exact />
                        <PrivateRoute path={routes.JOB_OFFER_CONTAINER_COMPANY} component={JobOffersContainer} exact />
                        <PrivateRoute path={routes.CONTRACTS_CONTAINER_EMPLOYEE} component={ContractsContainer} exact />
                        <PrivateRoute path={routes.CONTRACTS_CONTAINER_COMPANY} component={ContractsContainer} exact />
                    </Switch>
                </div>
            </BrowserRouter>
        </UserContextProvider>
    );
}

export default App;
