import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

export const EmployeeAccountInfo = ({ user }) => {
    return (
        <div className="sidebar__user-details">
            <div className="sidebar__user-details__header">
                <div className="sidebar__user-details__header__indicator-circle">M P</div>
                <div className="sidebar__user-details__info">
                    <h3> {user.name}</h3>
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

                    <div className="sidebar__user-details__view-profile">
                        <FontAwesomeIcon className="sidebar__user-details_view-profile__icon" icon={faEye} />
                        <div className="sidebar__user-details__view-profile__text ">View profile</div>
                    </div>
                </div>
            </div>
        </div>
    );
};
