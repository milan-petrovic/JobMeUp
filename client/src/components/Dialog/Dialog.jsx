import React from 'react';

export const Dialog = ({
    title,
    content,
    handleOnConfirm,
    handleOnClose,
}) => {
    return (
        <div className="dialog__background">
            <div className="dialog">
                <div className="dialog__title">{title}</div>
                <div className="dialog__content">
                    <p>{content}</p>
                    <div className="dialog__content__buttons-row">
                        <button className="button--confirm" onClick={handleOnConfirm}>
                            Confirm
                        </button>
                        <button className="button--cancel" onClick={handleOnClose}>
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>    
    );
};