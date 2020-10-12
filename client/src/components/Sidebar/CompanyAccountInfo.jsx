import React from 'react';
import { useHistory } from 'react-router-dom';
import { getIndicatorOfCompanyName } from '../../utils/Utils';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const CompanyAccountInfo = ({ user }) => {
    const history = useHistory();
    console.log(user);
    return (
        <>
            {user && (
                    <div className="sidebar__user-details">
                    <div className="sidebar__user-details__header">
                        <div className="sidebar__user-details__header__indicator-circle">
                            {getIndicatorOfCompanyName(user.name)}
                        </div>
                        <div className="sidebar__user-details__info">
                            <h3> {user.name}</h3>
                            <p>{user.email}</p>
                        </div>
                        <div className="sidebar__user-details__data">
                            <div className="sidebar__user-details__data__row">
                                <div className="sidebar__user-details__data_row__left-side">Phone number</div>
                                <div className="sidebar__user-details__data_row__right-side">{user.phoneNumber}</div>
                            </div>
                            <div className="sidebar__user-details__data__row">
                                <div className="sidebar__user-details__data_row__left-side">Address</div>
                                <div className="sidebar__user-details__data_row__right-side">{user.address}</div>
                            </div>

                            <div className="sidebar__user-details__edit-profile">
                                <FontAwesomeIcon
                                    className="sidebar__user-details_edit-profile__icon"
                                    icon={faPencilAlt}
                                />
                                <div
                                    className="sidebar__user-details__edit-profile__text"
                                    onClick={() => history.push(`/company/edit/${user.companyId}`)}>
                                    Edit profile
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}