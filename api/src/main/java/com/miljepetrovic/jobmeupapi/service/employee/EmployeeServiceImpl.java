package com.miljepetrovic.jobmeupapi.service.employee;

import java.util.Collections;
import java.util.Comparator;
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
public class EmployeeServiceImpl implements EmployeeService {
    private final static Logger logger = LoggerFactory.getLogger(EmployeeServiceImpl.class);
    private final EmployeeRepository employeeRepository;
    private final EmployeeMapper employeeMapper;

    public EmployeeServiceImpl(EmployeeRepository employeeRepository, EmployeeMapper employeeMapper) {
        this.employeeRepository = employeeRepository;
        this.employeeMapper = employeeMapper;
    }

    @Override
    public List<EmployeeDto> findAll() {
        logger.debug("Getting all employees {}");
        List<Employee> employeeEntities = employeeRepository.findAll();

        return employeeEntities.stream().map(employeeMapper::entityToDto).collect(Collectors.toList());
    }

    @Override
    public List<EmployeeDto> findAllEmployeesByCategory(int categoryId) {
        logger.debug("Getting all employees by category with id {}", categoryId);
        List<Employee> employeesByCategory = employeeRepository.findEmployeeByCategoryId(categoryId);

        return employeesByCategory.stream().map(employeeMapper::entityToDto).collect(Collectors.toList());
    }

    @Override
    public List<EmployeeDto> findAllEmployeesSortedByReceivedVotes() {
        logger.debug("Getting all employees sorted by received votes");

        List<Employee> employees = employeeRepository.findAll();
        employees.sort(Comparator.comparingInt(employee -> employee.getReceivedVotes().size()));
        Collections.reverse(employees);

        return employees.stream().map(employeeMapper::entityToDto).collect(Collectors.toList());
    }

    @Override
    public List<EmployeeDto> findAllEmployeesbyCategorySortedByReceivedVotes(int categoryId) {
        logger.debug("Getting all employees by category with id {} sorted by received votes", categoryId);

        List<Employee> employees = employeeRepository.findEmployeeByCategoryId(categoryId);
        employees.sort(Comparator.comparingInt(employee -> employee.getReceivedVotes().size()));
        Collections.reverse(employees);

        return employees.stream().map(employeeMapper::entityToDto).collect(Collectors.toList());
    }
}
