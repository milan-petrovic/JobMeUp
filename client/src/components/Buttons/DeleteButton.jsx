import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

export const DeleteButton = ({ handleClick }) => {
    return <FontAwesomeIcon className="button--delete" icon={faTrash} onClick={handleClick} />;
};
