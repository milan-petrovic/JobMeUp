import { useField } from 'formik';
import React from 'react';

export const InputTextArea = (props) => {
    const [field, meta] = useField(props);

    return (
        <div className="inputfield">
            <label htmlFor={props.name}>{props.labelName}</label>
            <textarea {...props} {...field} />
            <div style={{ color: 'red' }}>{meta.error && meta.touched && meta.error}</div>
        </div>
    );
};
