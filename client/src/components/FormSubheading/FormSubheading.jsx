import React from 'react';
import { Link } from 'react-router-dom';

export const FormSubheading = ({ text, linkText, path }) => {
    return (
        <div className="form-subheading">
            {text} <Link to={path}>{linkText}</Link>
        </div>
    );
};
