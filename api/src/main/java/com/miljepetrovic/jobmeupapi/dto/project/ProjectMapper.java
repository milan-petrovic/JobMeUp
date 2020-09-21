package com.miljepetrovic.jobmeupapi.dto.project;

import org.mapstruct.Mapper;

import com.miljepetrovic.jobmeupapi.model.Project;

@Mapper(componentModel = "spring")
public interface ProjectMapper {
    ProjectDto entityToDto(Project entity);
    Project dtoToEntity(ProjectDto dto);
}
