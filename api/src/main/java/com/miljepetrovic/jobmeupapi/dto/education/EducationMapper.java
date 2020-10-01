package com.miljepetrovic.jobmeupapi.dto.education;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

import com.miljepetrovic.jobmeupapi.dto.employee.EmployeeMapper;
import com.miljepetrovic.jobmeupapi.model.Education;

@Mapper(componentModel = "spring", uses = {EmployeeMapper.class})
public interface EducationMapper {
    EducationDto entityToDto(Education entity);
    Education dtoToEntity(EducationDto dto);

    @Mapping(target = "employee", qualifiedByName = "employeeDtoInsert")
    Education requestDtoToEntity(EducationRequestDto requestDto);
}
