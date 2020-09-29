import React from 'react';

export const SubmitButton = (props) => {
    return (
        <button type="submit" className="button--submit">
            {props.children}
        </button>
    );
};
