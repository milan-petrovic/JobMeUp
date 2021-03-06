import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { getIndicatorsOfFirstAndLastName } from '../../utils/Utils';

export const EmployeeAccountInfo = ({ user }) => {
    const history = useHistory();

    return (
        <>
            {user && (
                <div className="sidebar__user-details">
                    <div className="sidebar__user-details__header">
                        <div className="sidebar__user-details__header__indicator-circle">
                            {getIndicatorsOfFirstAndLastName(user.firstName, user.lastName)}
                        </div>
                        <div className="sidebar__user-details__info">
                            <h3> {user.firstName + ' ' + user.lastName}</h3>
                            <p>{user.email}</p>
                        </div>
                        <div className="sidebar__user-details__data">
                            <div className="sidebar__user-details__data__row">
                                <div className="sidebar__user-details__data_row__left-side">Received votes</div>
                                <div className="sidebar__user-details__data_row__right-side">{user.receivedVotes}</div>
                            </div>
                            <div className="sidebar__user-details__data__row">
                                <div className="sidebar__user-details__data_row__left-side">Given votes</div>
                                <div className="sidebar__user-details__data_row__right-side">{user.givenVotes}</div>
                            </div>

                            <div className="sidebar__user-details__edit-profile">
                                <FontAwesomeIcon
                                    className="sidebar__user-details_edit-profile__icon"
                                    icon={faPencilAlt}
                                />
                                <div
                                    className="sidebar__user-details__edit-profile__text"
                                    onClick={() => history.push('/edit-profile')}>
                                    Edit profile
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
