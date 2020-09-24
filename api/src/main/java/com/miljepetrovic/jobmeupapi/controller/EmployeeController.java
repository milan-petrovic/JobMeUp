package com.miljepetrovic.jobmeupapi.controller;

import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
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
    public ResponseEntity<List<EmployeeDto>> getAllEmployees(@RequestParam(name = "popular", required = false) boolean popular) {
        logger.info("GET /employees");
        if (popular) {
            return ResponseEntity.ok(employeeService.findAllEmployeesSortedByReceivedVotes());
        } else {
            return ResponseEntity.ok(employeeService.findAll());
        }
    }

    @GetMapping(value = "/category/{categoryId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<EmployeeDto>>
    getAllEmployeesByCategory(@PathVariable int categoryId,
                              @RequestParam(name = "popular", required = false) boolean popular) {
        logger.info("GET /employees/category/{}", categoryId);
        if (popular) {
            return ResponseEntity.ok(employeeService.findAllEmployeesbyCategorySortedByReceivedVotes(categoryId));
        } else {
            return ResponseEntity.ok(employeeService.findAllEmployeesByCategory(categoryId));
        }
    }
}
