package com.miljepetrovic.jobmeupapi.controller;

import java.net.URI;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.miljepetrovic.jobmeupapi.dto.project.ProjectDto;
import com.miljepetrovic.jobmeupapi.dto.project.ProjectRequestDto;
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

    @PostMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ProjectDto> addProject(@RequestBody ProjectRequestDto projectDto) {
        logger.info("POST /projects {}", projectDto);
        ProjectDto persistedProject = projectService.saveProject(projectDto);

        return ResponseEntity.created(URI.create(String.valueOf(persistedProject.id))).build();
    }
}
