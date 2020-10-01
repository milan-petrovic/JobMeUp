import { faPen, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

export const EditButton = ({ handleClick }) => {
    return <FontAwesomeIcon className="button--edit" icon={faPen} onClick={handleClick} />;
};
