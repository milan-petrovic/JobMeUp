package com.miljepetrovic.jobmeupapi.service.employment;

import java.util.List;

import com.miljepetrovic.jobmeupapi.dto.employee.EmployeeDto;
import com.miljepetrovic.jobmeupapi.dto.employment.EmploymentDto;
import com.miljepetrovic.jobmeupapi.dto.employment.EmploymentRequestDto;
import com.miljepetrovic.jobmeupapi.exception.NonExistingException;
import com.miljepetrovic.jobmeupapi.model.Employment;

public interface EmploymentService {
    List<EmploymentDto> findAllEmployments();
    EmploymentDto findEmploymentById(int employmentId) throws NonExistingException;
    EmploymentDto updateEmployment(EmploymentRequestDto employmentRequestDto) throws NonExistingException;
    EmploymentDto saveEmployment(EmploymentRequestDto employmentDto);
    void deleteEmployment(int employmentId) throws NonExistingException;
}
