package com.miljepetrovic.jobmeupapi.dto.project;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.miljepetrovic.jobmeupapi.dto.employee.EmployeeMapper;
import com.miljepetrovic.jobmeupapi.model.Project;

@Mapper(componentModel = "spring", uses = {EmployeeMapper.class})
public interface ProjectMapper {
    ProjectDto entityToDto(Project entity);
    Project dtoToEntity(ProjectDto dto);

    @Mapping(target = "employee", qualifiedByName = "employeeDtoInsert")
    Project requestDtoToEntity(ProjectRequestDto requestDto);
}
