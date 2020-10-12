export const getIndicatorsOfFirstAndLastName = (firstName, lastName) =>
    firstName.charAt(0).toUpperCase() + ' ' + lastName.charAt(0).toUpperCase();

export const getIndicatorOfCompanyName = (companyName) => companyName.charAt(0).toUpperCase();

export const getFullName = (firstName, lastName) => firstName + ' ' + lastName;