package com.miljepetrovic.jobmeupapi.controller;

import java.net.URI;
import java.util.List;
import java.util.Optional;

import javax.print.attribute.standard.Media;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.MediaType;

import com.miljepetrovic.jobmeupapi.dto.employee.EmployeeDto;
import com.miljepetrovic.jobmeupapi.dto.employee.EmployeeRequestDto;
import com.miljepetrovic.jobmeupapi.exception.ExistingException;
import com.miljepetrovic.jobmeupapi.exception.NonExistingException;
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

    @GetMapping(value = "/others/{employeeId}")
    public ResponseEntity<List<EmployeeDto>> getAllOtherEmployees(@PathVariable(name = "employeeId") int employeeId) {
        logger.info("GET /employees/other/{}", employeeId);

        return ResponseEntity.ok(employeeService.findAllOtherEmployees(employeeId));
    }

    @PostMapping(value = "/register", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> registerEmployee(@RequestBody EmployeeRequestDto requestDto) throws ExistingException {
        EmployeeDto savedEmployee = employeeService.saveEmployee(requestDto);

        return ResponseEntity.created(URI.create(String.valueOf(savedEmployee.id))).build();
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

    @GetMapping(value = "/{id}/{employeeId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<EmployeeDto> getEmployeeByIdForEmployee(@PathVariable (name="employeeId") int employeeId, @PathVariable (name="id") int id) throws NonExistingException {
        logger.info("GET /employees/{}/{}", id, employeeId);

        return ResponseEntity.ok(employeeService.findEmployeeByIdForEmployee(employeeId, id));
    }

    @GetMapping(value = "/{employeeId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<EmployeeDto> getEmployeeById(@PathVariable (name="employeeId") int employeeId) throws NonExistingException {
        logger.info("GET /employees/{}", employeeId);

        return ResponseEntity.ok(employeeService.findEmployeeById(employeeId));
    }

    @PutMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<EmployeeDto> updateEmployee(@RequestBody EmployeeRequestDto employeeRequestDto) throws NonExistingException {
        logger.info("PUT /employees {}", employeeRequestDto);

        return ResponseEntity.ok(employeeService.putEmployee(employeeRequestDto));
    }
}
