package com.miljepetrovic.jobmeupapi.dto.contract;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

import com.miljepetrovic.jobmeupapi.dto.company.CompanyMapper;
import com.miljepetrovic.jobmeupapi.dto.employee.EmployeeMapper;
import com.miljepetrovic.jobmeupapi.model.Contract;

@Mapper(componentModel = "spring", uses = {EmployeeMapper.class, CompanyMapper.class})
public abstract class ContractMapper {
    @Mappings({
            @Mapping(target = "employee", qualifiedByName = "employeeDto"),
            @Mapping(target = "company", qualifiedByName = "companyDto")
    })
    public abstract ContractDto entityToDto(Contract entity);

    @Mappings({
            @Mapping(target = "employee", qualifiedByName = "employeeDtoInsert")
    })
    public abstract Contract dtoToEntity(ContractDto dto);
}
