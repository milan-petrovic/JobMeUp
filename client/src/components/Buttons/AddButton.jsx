import { faPlus, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

export const AddButton = ({ handleClick }) => {
    return <FontAwesomeIcon className="button--add" icon={faPlusCircle} onClick={handleClick} />;
};
