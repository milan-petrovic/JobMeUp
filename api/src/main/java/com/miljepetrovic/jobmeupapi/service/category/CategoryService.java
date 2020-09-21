package com.miljepetrovic.jobmeupapi.service.category;

import java.util.List;

import com.miljepetrovic.jobmeupapi.dto.category.CategoryDto;

public interface CategoryService {
    List<CategoryDto> findAll();
}
