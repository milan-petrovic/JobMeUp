package com.miljepetrovic.jobmeupapi.service.employee;

import java.util.List;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.miljepetrovic.jobmeupapi.dto.employee.EmployeeDto;
import com.miljepetrovic.jobmeupapi.dto.employee.EmployeeMapper;
import com.miljepetrovic.jobmeupapi.model.Employee;
import com.miljepetrovic.jobmeupapi.repository.EmployeeRepository;

@Service
public class EmployeeServiceImpl implements EmployeeService{
    private final static Logger logger = LoggerFactory.getLogger(EmployeeServiceImpl.class);
    private final EmployeeRepository employeeRepository;
    private final EmployeeMapper employeeMapper;

    public EmployeeServiceImpl(EmployeeRepository employeeRepository, EmployeeMapper employeeMapper) {
        this.employeeRepository = employeeRepository;
        this.employeeMapper = employeeMapper;
    }

    @Override
    public List<EmployeeDto> findAll() {
        logger.info("Getting all employees {}");
        List<Employee> employees = employeeRepository.findAll();
        List<EmployeeDto> employeeDtos = employees.stream().map(employeeMapper::entityToDto).collect(Collectors.toList());
        return employeeDtos;
    }
}
