package com.miljepetrovic.jobmeupapi.service.project;

import java.util.List;

import com.miljepetrovic.jobmeupapi.dto.project.ProjectDto;
import com.miljepetrovic.jobmeupapi.dto.project.ProjectRequestDto;
import com.miljepetrovic.jobmeupapi.exception.NonExistingException;

public interface ProjectService {
    List<ProjectDto> findAllProject();
    ProjectDto saveProject(ProjectRequestDto projectDto);
    void deleteProject(int projectId) throws NonExistingException;
}
