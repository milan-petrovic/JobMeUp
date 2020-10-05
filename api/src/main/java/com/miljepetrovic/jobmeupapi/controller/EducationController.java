package com.miljepetrovic.jobmeupapi.controller;

import java.net.URI;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.miljepetrovic.jobmeupapi.dto.education.EducationDto;
import com.miljepetrovic.jobmeupapi.dto.education.EducationRequestDto;
import com.miljepetrovic.jobmeupapi.exception.NonExistingException;
import com.miljepetrovic.jobmeupapi.service.education.EducationService;

@RestController
@RequestMapping("/educations")
public class EducationController {
    public final static Logger logger = LoggerFactory.getLogger(EducationController.class);

    private final EducationService educationService;

    @Autowired
    public EducationController(EducationService educationService) {
        this.educationService = educationService;
    }

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<EducationDto>> getAllEducations() {
        logger.info("GET /educations");

        return ResponseEntity.ok(educationService.findAllEducations());
    }

    @PostMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> addNewEducation(@RequestBody EducationRequestDto educationRequestDto) {
        logger.info("POST /educations {}", educationRequestDto);

        EducationDto persistedEducation = educationService.saveEducation(educationRequestDto);
        return ResponseEntity.created(URI.create(String.valueOf(persistedEducation.id))).build();
    }

    @PutMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<EducationDto> updateEducation(@RequestBody EducationRequestDto educationRequestDto) throws NonExistingException {
        logger.info("PUT /educations {}", educationRequestDto);

        EducationDto updatedEducation = educationService.updateEducation(educationRequestDto);

        return ResponseEntity.ok(updatedEducation);
    }

    @GetMapping(value = "/{educationId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<EducationDto> getEducationById(@PathVariable(name = "educationId") int id) throws NonExistingException {
        logger.info("GET /education/{}", id);

        return ResponseEntity.ok(educationService.findEducationById(id));
    }
}
