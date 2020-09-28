import React, { useEffect, useState } from 'react';
import { getAllCategories } from '../../services/CategoryService';
import { Spinner } from '../Spinner/Spinner';

export const SidebarCategoriesMenu = ({ handleOnCategoryClick }) => {
    const [categories, setCategories] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        getAllCategories()
            .then((response) => {
                setCategories(response.data);
                setLoading(false);
            })
            .catch((error) => console.log(error));
    }, []);

    return (
        <div className="sidebar__menu_items">
            {isLoading ? (
                <Spinner />
            ) : (
                <>
                    <h4>Categories</h4>
                    {categories.map((category, index) => {
                        return (
                            <div
                                className="sidebar_menu_items__item"
                                key={index}
                                onClick={() => handleOnCategoryClick(category.id)}>
                                {category.name}
                            </div>
                        );
                    })}
                </>
            )}
        </div>
    );
};
