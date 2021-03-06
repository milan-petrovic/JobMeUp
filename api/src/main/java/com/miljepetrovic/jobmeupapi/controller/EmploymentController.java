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

import com.miljepetrovic.jobmeupapi.dto.employment.EmploymentDto;
import com.miljepetrovic.jobmeupapi.dto.employment.EmploymentRequestDto;
import com.miljepetrovic.jobmeupapi.exception.NonExistingException;
import com.miljepetrovic.jobmeupapi.model.Employment;
import com.miljepetrovic.jobmeupapi.service.employment.EmploymentService;

@RestController
@RequestMapping("employments")
public class EmploymentController {
    private final static Logger logger = LoggerFactory.getLogger(EmploymentController.class);

    private final EmploymentService employmentService;

    @Autowired
    public EmploymentController(EmploymentService employmentService) {
        this.employmentService = employmentService;
    }

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<EmploymentDto>> getAllEmployments() {
        logger.info("GET /employments");

        return ResponseEntity.ok(employmentService.findAllEmployments());
    }

    @PostMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> addNewEmployment(@RequestBody EmploymentRequestDto employmentDto) {
        logger.info("POST /employments");

        EmploymentDto persistedEmployment = employmentService.saveEmployment(employmentDto);
        return ResponseEntity.created(URI.create(String.valueOf(persistedEmployment.id))).build();
    }

    @GetMapping(value = "/{employmentId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<EmploymentDto> getEmploymentById(@PathVariable(name = "employmentId") int employmentId) throws NonExistingException {
        logger.info("GET /employment/{}", employmentId);

        return ResponseEntity.ok(employmentService.findEmploymentById(employmentId));
    }

    @PutMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<EmploymentDto> putEmployment(@RequestBody EmploymentRequestDto employmentRequestDto) throws NonExistingException {
        logger.info("PUT /employment", employmentRequestDto);

        return ResponseEntity.ok(employmentService.updateEmployment(employmentRequestDto));
    }

    @DeleteMapping(value = "/{employmentId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> deleteEmployment(@PathVariable(name = "employmentId") int employmentId) throws NonExistingException {
        logger.debug("DELETE /employment/{}", employmentId);
        employmentService.deleteEmployment(employmentId);
        return ResponseEntity.accepted().build();
    }

}
