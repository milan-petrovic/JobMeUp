package com.miljepetrovic.jobmeupapi.dto.employment;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.miljepetrovic.jobmeupapi.dto.employee.EmployeeMapper;
import com.miljepetrovic.jobmeupapi.model.Employment;

@Mapper(componentModel = "spring", uses = {EmployeeMapper.class})
public interface EmploymentMapper {
    EmploymentDto entityToDto(Employment entity);
    Employment dtoToEntity(EmploymentDto dto);

    @Mapping(target = "employee", qualifiedByName = "employeeDtoInsert")
    Employment requestDtoToEntity(EmploymentRequestDto requestDto);
}
