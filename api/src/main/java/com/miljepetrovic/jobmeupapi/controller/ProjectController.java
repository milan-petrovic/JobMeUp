package com.miljepetrovic.jobmeupapi.controller;

import java.net.URI;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.miljepetrovic.jobmeupapi.dto.project.ProjectDto;
import com.miljepetrovic.jobmeupapi.dto.project.ProjectRequestDto;
import com.miljepetrovic.jobmeupapi.exception.NonExistingException;
import com.miljepetrovic.jobmeupapi.service.project.ProjectService;

@RestController
@RequestMapping("projects")
public class ProjectController {
    private static final Logger logger = LoggerFactory.getLogger(ProjectController.class);

    private final ProjectService projectService;

    @Autowired
    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<ProjectDto>> getAllProjects() {
        logger.info("GET /projects");
        return ResponseEntity.ok(projectService.findAllProject());
    }

    @GetMapping(value = "/{projectId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ProjectDto> getProjectById(@PathVariable(name = "projectId") int projectId) throws NonExistingException {
        logger.info("GET /projects/{}", projectId);

        return ResponseEntity.ok(projectService.findProjectById(projectId));
    }

    @PostMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ProjectDto> addProject(@RequestBody ProjectRequestDto projectDto) {
        logger.info("POST /projects {}", projectDto);
        ProjectDto persistedProject = projectService.saveProject(projectDto);

        return ResponseEntity.created(URI.create(String.valueOf(persistedProject.id))).build();
    }

    @DeleteMapping(value = "/{projectId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> deleteProject(@PathVariable int projectId) throws NonExistingException {
        logger.info("DELETE /projects/{}", projectId);
        projectService.deleteProject(projectId);

        return ResponseEntity.accepted().build();
    }

    @PutMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ProjectDto> updateProject(@RequestBody ProjectRequestDto projectRequestDto) throws NonExistingException {
        logger.info("PUT /projects {}", projectRequestDto);

        ProjectDto projectDto = projectService.updateProject(projectRequestDto);

        return ResponseEntity.ok(projectDto);
    }
}
