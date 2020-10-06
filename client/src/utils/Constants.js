export const baseRoutes = {
    API_URL: 'http://localhost:8090',
    BASE_URL: 'http://localhost:3000',
};

export const routes = {
    HOME: '/',
    EMPLOYEE_HOME: '/employee/home',
    COMPANY_HOME: '/company/home',
    EMPLOYEE_BY_ID: '/profile/:id',
    LOGIN: '/login',
    COMPANY_NEW: '/company/new',
    EDIT_PROFILE: '/edit-profile',
    EMPLOYEE_NEW_EMPLOYMENT: '/employee/:id/employments/new',
    EMPLOYEE_NEW_PROJECT: '/employee/:id/projects/new',
    EMPLOYEE_NEW_EDUCATION: '/employee/:id/educations/new',
    EMPLOYEE_EDIT_EDUCATION: '/employee/:id/educations/edit/:educationId',
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
