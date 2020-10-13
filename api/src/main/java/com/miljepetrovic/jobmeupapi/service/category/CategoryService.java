package com.miljepetrovic.jobmeupapi.service.category;

import java.util.List;

import com.miljepetrovic.jobmeupapi.dto.category.CategoryDto;
import com.miljepetrovic.jobmeupapi.exception.ExistingException;
import com.miljepetrovic.jobmeupapi.exception.NonExistingException;
import com.miljepetrovic.jobmeupapi.model.Category;

public interface CategoryService {
    List<CategoryDto> findAll();
    CategoryDto findCategoryById(int categoryId) throws NonExistingException;
    CategoryDto saveCategory(CategoryDto categoryDto) throws ExistingException;
    void deleteCategory(int categoryId) throws NonExistingException;
    CategoryDto updateCategory(CategoryDto categoryDto) throws NonExistingException;
}
