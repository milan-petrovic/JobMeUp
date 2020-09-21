package com.miljepetrovic.jobmeupapi.service.project;

import java.util.List;

import com.miljepetrovic.jobmeupapi.dto.project.ProjectDto;
import com.miljepetrovic.jobmeupapi.dto.project.ProjectRequestDto;

public interface ProjectService {
    List<ProjectDto> findAllProject();
    ProjectDto saveProject(ProjectRequestDto projectDto);
}
