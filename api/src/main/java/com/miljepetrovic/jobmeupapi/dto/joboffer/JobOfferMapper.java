package com.miljepetrovic.jobmeupapi.dto.joboffer;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

import com.miljepetrovic.jobmeupapi.dto.company.CompanyMapper;
import com.miljepetrovic.jobmeupapi.dto.employee.EmployeeMapper;
import com.miljepetrovic.jobmeupapi.model.JobOffer;

@Mapper(componentModel = "spring", uses = {EmployeeMapper.class, CompanyMapper.class})
public abstract class JobOfferMapper {

    @Mappings({
            @Mapping(target = "employee", qualifiedByName = "employeeDto"),
            @Mapping(target = "company", qualifiedByName = "companyDto")
    })
    public abstract JobOfferDto entityToDto(JobOffer entity);
    public abstract JobOffer dtoToEntity(JobOfferDto dto);
}
