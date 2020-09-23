package com.miljepetrovic.jobmeupapi.dto.company;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;
import org.mapstruct.Named;

import com.miljepetrovic.jobmeupapi.model.Company;

@Mapper(componentModel = "spring")
public interface CompanyMapper {
    @Named("companyDto")
    CompanyDto entityToDto(Company entity);

    @Mappings({
        @Mapping(target = "jobOffers", ignore = true),
        @Mapping(target = "contracts", ignore = true)
    })
    Company dtoToEntity(CompanyDto dto);
}
