import React from 'react';

export const SidebarCategoriesMenu = ({ categories }) => {
    return (
        <div className="sidebar__menu_items">
                <h4>Categories</h4>
                {categories.map((category, index) => {
                    return <div className="sidebar_menu_items__item" key={index}>{category.name}</div>
                })}
            </div>
    );
}