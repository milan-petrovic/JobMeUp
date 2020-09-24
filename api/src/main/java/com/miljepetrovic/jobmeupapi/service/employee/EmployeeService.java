package com.miljepetrovic.jobmeupapi.service.employee;

import java.util.List;

import com.miljepetrovic.jobmeupapi.dto.employee.EmployeeDto;

public interface EmployeeService {
    List<EmployeeDto> findAll();
    List<EmployeeDto> findAllEmployeesSortedByReceivedVotes();
    List<EmployeeDto> findAllEmployeesByCategory(int categoryId);
    List<EmployeeDto> findAllEmployeesbyCategorySortedByReceivedVotes(int categoryId);
}
