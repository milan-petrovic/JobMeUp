package com.miljepetrovic.jobmeupapi.service.employee;

import java.util.List;

import com.miljepetrovic.jobmeupapi.dto.employee.EmployeeDto;

public interface EmployeeService {
    List<EmployeeDto> findAll();
}
