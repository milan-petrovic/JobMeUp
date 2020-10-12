package com.miljepetrovic.jobmeupapi.service.project;

import java.util.List;

import com.miljepetrovic.jobmeupapi.dto.project.ProjectDto;
import com.miljepetrovic.jobmeupapi.dto.project.ProjectRequestDto;
import com.miljepetrovic.jobmeupapi.exception.NonExistingException;

public interface ProjectService {
    List<ProjectDto> findAllProject();
    ProjectDto findProjectById(int projectId) throws NonExistingException;
    ProjectDto saveProject(ProjectRequestDto projectDto);
    ProjectDto updateProject(ProjectRequestDto projectRequestDto) throws NonExistingException;
    void deleteProject(int projectId) throws NonExistingException;
}
