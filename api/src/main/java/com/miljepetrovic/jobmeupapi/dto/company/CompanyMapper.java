package com.miljepetrovic.jobmeupapi.dto.company;

import org.mapstruct.Mapper;

import com.miljepetrovic.jobmeupapi.model.Company;

@Mapper(componentModel = "spring")
public interface CompanyMapper {
    CompanyDto entityToDto(Company entity);
    Company dtoToEntity(CompanyDto dto);
}
