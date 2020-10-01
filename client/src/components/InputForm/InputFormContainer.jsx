import React from 'react';

export const InputFormContainer = ({ children, width }) => (
    <div className="input-form__container" style={{ width: width }}>
        {children}
    </div>
);
