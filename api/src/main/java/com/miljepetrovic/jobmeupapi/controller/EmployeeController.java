package com.miljepetrovic.jobmeupapi.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.MediaType;

import com.miljepetrovic.jobmeupapi.dto.employee.EmployeeDto;
import com.miljepetrovic.jobmeupapi.service.employee.EmployeeService;
import com.sun.mail.iap.Response;

@RestController
@RequestMapping("employees")
public class EmployeeController {
    private final static Logger logger = LoggerFactory.getLogger(EmployeeController.class);

    private final EmployeeService employeeService;

    @Autowired
    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<EmployeeDto>> getAllEmployees() {
        logger.info("GET /employees");
        return ResponseEntity.ok(employeeService.findAll());
    }
}
