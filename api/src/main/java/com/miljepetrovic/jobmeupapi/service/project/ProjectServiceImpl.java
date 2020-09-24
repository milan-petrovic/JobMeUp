package com.miljepetrovic.jobmeupapi.service.project;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.miljepetrovic.jobmeupapi.dto.project.ProjectDto;
import com.miljepetrovic.jobmeupapi.dto.project.ProjectMapper;
import com.miljepetrovic.jobmeupapi.dto.project.ProjectRequestDto;
import com.miljepetrovic.jobmeupapi.exception.NonExistingException;
import com.miljepetrovic.jobmeupapi.model.Project;
import com.miljepetrovic.jobmeupapi.repository.ProjectRepository;

@Service
public class ProjectServiceImpl implements ProjectService{
    private static final Logger logger = LoggerFactory.getLogger(ProjectServiceImpl.class);

    private final ProjectRepository projectRepository;
    private final ProjectMapper projectMapper;

    public ProjectServiceImpl(ProjectRepository projectRepository, ProjectMapper projectMapper) {
        this.projectRepository = projectRepository;
        this.projectMapper = projectMapper;
    }

    @Override
    public List<ProjectDto> findAllProject() {
        logger.debug("Getting all projects {}");
        List<Project> projectEntities = projectRepository.findAll();
        return projectEntities.stream().map(projectMapper::entityToDto).collect(Collectors.toList());
    }

    @Override
    public ProjectDto saveProject(ProjectRequestDto projectRequestDto) {
        logger.debug("Creating new project for user {}", projectRequestDto);
        Project project = projectMapper.requestDtoToEntity(projectRequestDto);
        Project savedEntity = projectRepository.save(project);

        return projectMapper.entityToDto(savedEntity);
    }

    @Override
    public void deleteProject(int projectId) throws NonExistingException {
        logger.debug("Deleting project with id {}", projectId);
        Optional<Project> projectById = projectRepository.findById(projectId);
        if (projectById.isEmpty()) {
            throw new NonExistingException("Non existing project with id " + projectId);
        }
        projectRepository.deleteById(projectId);
    }
}
