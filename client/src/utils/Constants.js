export const ApiUrl = 'http://localhost:8090';
export const EmployeeById = '/profile/:id';

export const requriedMessage = 'Requried field';
export const invalidEmailMessage = 'Invalid email';
export const getConstraintLengthMinMessage = (field, length) => {
    return `${field} must be at least ${length} characters long.`;
};

export const getConstraingLengthMaxMessage = (field, length) => {
    return `${field} could be at most ${length} characters long.`;
};
