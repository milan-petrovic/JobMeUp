export const baseRoutes = {
    API_URL: 'http://localhost:8090',
    BASE_URL: 'http://localhost:3000',
};

export const routes = {
    HOME: '/',
    EMPLOYEE_HOME: '/employee/home',
    COMPANY_HOME: '/company/home',
    EMPLOYEE_BY_ID: '/profile/:id',
    LOGIN: '/login/:role',
    LOGIN_EMPLOYEE: '/login/employee',
    LOGIN_COMPANY: '/login/company',
    COMPANY_REGISTER: '/company/register',
    EDIT_PROFILE: '/edit-profile',
    EMPLOYEE_NEW_EMPLOYMENT: '/employee/:id/employments/new',
    EMPLOYEE_EDIT_EMPLOYMENT: '/employee/:id/employments/edit/:employmentId',
    EMPLOYEE_NEW_PROJECT: '/employee/:id/projects/new',
    EMPLOYEE_EDIT_PROJECT: '/employee/:id/projects/edit/:projectId',
    EMPLOYEE_NEW_EDUCATION: '/employee/:id/educations/new',
    EMPLOYEE_EDIT_EDUCATION: '/employee/:id/educations/edit/:educationId',
    EMPLOYEE_REGISTER: '/employee/register',
    JOB_OFFER_NEW: '/company/job-offers/new',
    JOB_OFFER_CONTAINER_EMPLOYEE: '/employee/job-offers',
    JOB_OFFER_CONTAINER_COMPANY: '/company/job-offers',
    CONTRACTS_CONTAINER_EMPLOYEE: '/employee/contracts',
    CONTRACTS_CONTAINER_COMPANY: '/company/contracts',
};

export const roles = {
    EMPLOYEE: 'employee',
    ADMIN: 'admin',
    COMPANY: 'company',
};

export const requiredMessage = 'Required field';
export const invalidEmailMessage = 'Invalid email';
export const getConstraintLengthMinMessage = (field, length) => `${field} must be at least ${length} characters long.`;
export const getConstraingLengthMaxMessage = (field, length) => `${field} could be at most ${length} characters long.`;
export const EMPTY_INITIAL_FIELD = '';
