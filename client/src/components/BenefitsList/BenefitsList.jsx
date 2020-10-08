import React from 'react';

export const BenefitsContainer = ({ benefits }) => (
    <div className="benefit-container">
        {benefits.map((benefit, index) => (
            <div className="benefit-item">{benefit.name}</div>
        ))}
    </div>
);

export const BenefitsList = ({ benefits }) => (
    <div className="benefit-list ">
        {benefits.map((benefit, index) => (
            <div className="benefit-item">{benefit.name}</div>
        ))}
    </div>
);
