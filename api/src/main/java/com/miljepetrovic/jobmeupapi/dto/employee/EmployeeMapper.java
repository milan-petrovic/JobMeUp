package com.miljepetrovic.jobmeupapi.dto.employee;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

import com.miljepetrovic.jobmeupapi.dto.category.CategoryMapper;
import com.miljepetrovic.jobmeupapi.model.Employee;

@Mapper(componentModel = "spring", uses = {CategoryMapper.class})
public abstract class EmployeeMapper {

    @Mappings({@Mapping(target = "category", qualifiedByName = "categoryDto")})
    public abstract  EmployeeDto entityToDto(Employee employee);
    public abstract Employee dtoToEntity(EmployeeDto employeeDto);
}
