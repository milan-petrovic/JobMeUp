package com.miljepetrovic.jobmeupapi.dto.employment;

import org.mapstruct.Mapper;

import com.miljepetrovic.jobmeupapi.model.Employment;

@Mapper(componentModel = "spring")
public interface EmploymentMapper {
    EmploymentDto entityToDto(Employment entity);
    Employment dtoToEntity(EmploymentDto dto);
}
