import { useField } from 'formik';
import React from 'react';

export const SelectInputField = (props) => {
    const [field, meta] = useField(props);

    return (
        <div className="select-inputfield">
            <label htmlFor={props.name}>{props.labelName}</label>
            <input {...props} {...field} readOnly />
            <div style={{ color: 'red' }}>{meta.error && meta.touched && meta.error}</div>
        </div>
    );
};

export const SelectInputMenu = ({ visible, options, handleClick }) => {
    return (
        <>
            {visible ? (
                <div className="select-input-menu">
                    <ul>
                        {options.map((option, index) => {
                            return (
                                <li key={index} onClick={() => handleClick(option)}>
                                    {option.name}
                                </li>
                            );
                        })}
                    </ul>
                </div>
            ) : (
                <></>
            )}
        </>
    );
};
