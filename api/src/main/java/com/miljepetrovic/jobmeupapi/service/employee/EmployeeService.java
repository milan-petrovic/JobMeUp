package com.miljepetrovic.jobmeupapi.service.employee;

import java.util.List;
import com.miljepetrovic.jobmeupapi.dto.employee.EmployeeDto;
import com.miljepetrovic.jobmeupapi.dto.employee.EmployeeRequestDto;
import com.miljepetrovic.jobmeupapi.exception.ExistingException;
import com.miljepetrovic.jobmeupapi.exception.NonExistingException;

public interface EmployeeService {
    List<EmployeeDto> findAll();
    List<EmployeeDto> findAllEmployeesSortedByReceivedVotes();
    List<EmployeeDto> findAllEmployeesByCategory(int categoryId);
    List<EmployeeDto> findAllEmployeesbyCategorySortedByReceivedVotes(int categoryId);
    EmployeeDto findEmployeeById(int employeeId) throws NonExistingException;
    EmployeeDto findEmployeeByIdForEmployee(int employeeId, int id) throws NonExistingException;
    EmployeeDto saveEmployee(EmployeeRequestDto employeeRequestDto) throws ExistingException;
    List<EmployeeDto> findAllOtherEmployees(int id);
    EmployeeDto putEmployee(EmployeeRequestDto employeeRequestDto) throws NonExistingException;
}
