import { useField } from 'formik';
import React from 'react';

export const InputField = (props) => {
    const [field, meta] = useField(props);

    return (
        <div className="inputfield">
            <label htmlFor={props.name}>{props.labelName}</label>
            <input {...props} {...field} />
            {meta.error && meta.touched && meta.error}
        </div>
    );
};
