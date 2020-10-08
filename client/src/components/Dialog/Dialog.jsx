import React from 'react';
import { SelectInputMenu } from '../InputForm/SelectInputField';

export const Dialog = ({
    dialogTitle,
    content,
    selectedItems,
    selectButtonText,
    items,
    handleOnSelectedItemClick,
    handleOnSelectClick,
    handleOnConfirm,
    handleOpenOptionsMenu,
    handleCloseOptionsMenu,
    visible,
}) => {
    return (
        <div className="dialog__background">
            <div className="dialog">
                <div className="dialog__title">{dialogTitle}</div>
                <div className="dialog__content">
                    <p>{content}</p>
                    <div className="dialog__content__items-container">
                        <div className="dialog__content__items-container__items-list">
                            {selectedItems &&
                                selectedItems.map((item, index) => (
                                    <div
                                        className="dialog__content__items-container__items-list__item"
                                        onClick={() => handleOnSelectedItemClick(item)}>
                                        {item.name}
                                    </div>
                                ))}
                        </div>
                        <div
                            className="dialog__content__items-container_-items-list__item__select-button"
                            onClick={handleOpenOptionsMenu}>
                            {selectButtonText}
                        </div>
                        <SelectInputMenu visible={visible} options={items} handleClick={handleOnSelectClick} />
                    </div>
                    <div className="dialog__content__buttons-row">
                        <button className="button--confirm" onClick={handleOnConfirm}>
                            Confirm
                        </button>
                        <button className="button--cancel" onClick={handleCloseOptionsMenu}>
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
