package com.miljepetrovic.jobmeupapi.service.employee;

import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.miljepetrovic.jobmeupapi.dto.employee.EmployeeDto;
import com.miljepetrovic.jobmeupapi.dto.employee.EmployeeMapper;
import com.miljepetrovic.jobmeupapi.dto.employee.EmployeeRequestDto;
import com.miljepetrovic.jobmeupapi.dto.registered_user.RegisteredUserDto;
import com.miljepetrovic.jobmeupapi.exception.ExistingException;
import com.miljepetrovic.jobmeupapi.exception.NonExistingException;
import com.miljepetrovic.jobmeupapi.model.Employee;
import com.miljepetrovic.jobmeupapi.repository.EmployeeRepository;
import com.miljepetrovic.jobmeupapi.repository.RegisteredUserRepository;
import com.miljepetrovic.jobmeupapi.service.registered_user.RegisteredUserService;

@Service
public class EmployeeServiceImpl implements EmployeeService {
    private final static Logger logger = LoggerFactory.getLogger(EmployeeServiceImpl.class);
    private final EmployeeRepository employeeRepository;
    private final RegisteredUserRepository registeredUserRepository;
    private final EmployeeMapper employeeMapper;
    private final RegisteredUserService registeredUserService;
    private final PasswordEncoder bcryptEncoder;

    public EmployeeServiceImpl(EmployeeRepository employeeRepository, RegisteredUserRepository registeredUserRepository, EmployeeMapper employeeMapper, RegisteredUserService registeredUserService, PasswordEncoder bcryptEncoder) {
        this.employeeRepository = employeeRepository;
        this.registeredUserRepository = registeredUserRepository;
        this.employeeMapper = employeeMapper;
        this.registeredUserService = registeredUserService;
        this.bcryptEncoder = bcryptEncoder;
    }

    @Override
    public List<EmployeeDto> findAll() {
        logger.debug("Getting all employees {}");
        List<Employee> employeeEntities = employeeRepository.findAll();

        return employeeEntities.stream().map(employeeMapper::entityToDto).collect(Collectors.toList());
    }

    @Override
    public List<EmployeeDto> findAllOtherEmployees(int id) {
        logger.debug("Getting all other employees {}");
        List<Employee> employeeEntities = employeeRepository.findCollegueEmployees(id);

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

    @Override
    public EmployeeDto findEmployeeById(int employeeId) throws NonExistingException {
        logger.debug("Fetching employee by id");
        Optional<Employee> employeeById = employeeRepository.findEmployeeById(employeeId);
        if (employeeById.isEmpty()) {
            throw new NonExistingException("Couldn't find employee with id " + employeeById);
        }

        return employeeMapper.entityToDto(employeeById.get());
    }

    @Override
    public EmployeeDto saveEmployee(EmployeeRequestDto employeeRequestDto) throws ExistingException {
        logger.debug("Saving employee {}", employeeRequestDto);

        Optional<Employee> employeeByEmail = employeeRepository.findEmployeeByEmail(employeeRequestDto.email);
        if (employeeByEmail.isPresent() || registeredUserRepository.findRegisteredUserByEmail(employeeRequestDto.email).isPresent()) {
            throw new ExistingException("Employee exists with email: " + employeeRequestDto.email);
        } else {
            Employee employee = employeeMapper.requestDtoToEntity(employeeRequestDto);
            employee.setPassword(bcryptEncoder.encode(employeeRequestDto.password));
            Employee persistedEmployee = employeeRepository.save(employee);

            RegisteredUserDto registeredUserDto = new RegisteredUserDto();
            registeredUserDto.email = persistedEmployee.getEmail();
            registeredUserDto.password = persistedEmployee.getPassword();
            registeredUserDto.type = "employee";
            registeredUserDto.actualId = persistedEmployee.getId();

            registeredUserService.saveRegisteredUser(registeredUserDto);

            return employeeMapper.createdEntityToDto(persistedEmployee);
        }
    }
}
