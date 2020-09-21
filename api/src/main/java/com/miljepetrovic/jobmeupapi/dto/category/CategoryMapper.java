package com.miljepetrovic.jobmeupapi.dto.category;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import com.miljepetrovic.jobmeupapi.model.Category;

@Mapper(componentModel = "spring")
public abstract class CategoryMapper {

    @Named("categoryDto")
    public abstract CategoryDto entityToDto(Category category);
    public abstract Category dtoToEntity(CategoryDto categoryDto);
}
