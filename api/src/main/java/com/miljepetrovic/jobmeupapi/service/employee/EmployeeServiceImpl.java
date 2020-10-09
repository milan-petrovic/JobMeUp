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

import com.miljepetrovic.jobmeupapi.dto.benefit.BenefitMapper;
import com.miljepetrovic.jobmeupapi.dto.category.CategoryMapper;
import com.miljepetrovic.jobmeupapi.dto.employee.EmployeeDto;
import com.miljepetrovic.jobmeupapi.dto.employee.EmployeeMapper;
import com.miljepetrovic.jobmeupapi.dto.employee.EmployeeRequestDto;
import com.miljepetrovic.jobmeupapi.dto.registered_user.RegisteredUserDto;
import com.miljepetrovic.jobmeupapi.dto.skill.SkillMapper;
import com.miljepetrovic.jobmeupapi.exception.ExistingException;
import com.miljepetrovic.jobmeupapi.exception.NonExistingException;
import com.miljepetrovic.jobmeupapi.model.Employee;
import com.miljepetrovic.jobmeupapi.model.RegisteredUser;
import com.miljepetrovic.jobmeupapi.repository.EmployeeRepository;
import com.miljepetrovic.jobmeupapi.repository.RegisteredUserRepository;
import com.miljepetrovic.jobmeupapi.service.registered_user.RegisteredUserService;
import com.miljepetrovic.jobmeupapi.service.vote.VoteService;

@Service
public class EmployeeServiceImpl implements EmployeeService {
    private final static Logger logger = LoggerFactory.getLogger(EmployeeServiceImpl.class);
    private final EmployeeRepository employeeRepository;
    private final RegisteredUserRepository registeredUserRepository;
    private final VoteService voteService;
    private final EmployeeMapper employeeMapper;
    private final RegisteredUserService registeredUserService;
    private final PasswordEncoder bcryptEncoder;
    private final CategoryMapper categoryMapper;
    private final SkillMapper skillMapper;
    private final BenefitMapper benefitMapper;

    public EmployeeServiceImpl(EmployeeRepository employeeRepository, RegisteredUserRepository registeredUserRepository, VoteService voteService, EmployeeMapper employeeMapper, RegisteredUserService registeredUserService, PasswordEncoder bcryptEncoder, CategoryMapper categoryMapper, SkillMapper skillMapper, BenefitMapper benefitMapper) {
        this.employeeRepository = employeeRepository;
        this.registeredUserRepository = registeredUserRepository;
        this.voteService = voteService;
        this.employeeMapper = employeeMapper;
        this.registeredUserService = registeredUserService;
        this.bcryptEncoder = bcryptEncoder;
        this.categoryMapper = categoryMapper;
        this.skillMapper = skillMapper;
        this.benefitMapper = benefitMapper;
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

        return employeeEntities.stream().map(employee -> {
            EmployeeDto employeeDto = employeeMapper.entityToDto(employee);
            if (voteService.findVoteByGivenEmployeeIdAndReceivedEmployeeId(id, employeeDto.id).isPresent()) {
                employeeDto.isVotedByEmployee = true;
            }
            return employeeDto;
        }).collect(Collectors.toList());
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
    public EmployeeDto findEmployeeByIdForEmployee(int employeeId, int id) throws NonExistingException {
        logger.debug("Fetching employee by id");
        Optional<Employee> employeeById = employeeRepository.findEmployeeById(employeeId);
        if (employeeById.isEmpty()) {
            throw new NonExistingException("Couldn't find employee with id " + employeeById);
        }

        EmployeeDto employeeDto = employeeMapper.entityToDto(employeeById.get());
        if (voteService.findVoteByGivenEmployeeIdAndReceivedEmployeeId(id, employeeId).isPresent()) {
            employeeDto.isVotedByEmployee = true;
        }

        return employeeDto;
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
        if (employeeByEmail.isPresent() ||
            registeredUserRepository.findRegisteredUserByEmail(employeeRequestDto.email).isPresent()) {
            throw new ExistingException("Employee exists with email: " + employeeRequestDto.email);
        } else {
            Employee employee = employeeMapper.requestDtoToEntity(employeeRequestDto);
            employee.setPassword(bcryptEncoder.encode(employeeRequestDto.password));
            employee.setSkills(employeeRequestDto.skills.stream().map(skillMapper::dtoToEntity).collect(Collectors.toList()));
            employee.setBenefits(employeeRequestDto.benefits.stream().map(benefitMapper::dtoToEntity).collect(Collectors.toList()));
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

    @Override
    public EmployeeDto putEmployee(EmployeeRequestDto employeeRequestDto) throws NonExistingException {
        logger.debug("Updating employee {}", employeeRequestDto);

        Optional<Employee> employeeOptional = employeeRepository.findById(employeeRequestDto.id);
        if (employeeOptional.isPresent()) {
            Employee employee = employeeOptional.get();
            employee.setEmail(employeeRequestDto.email);

            if (employee.getPassword().equals(employeeRequestDto.password)) {
                employee.setPassword(employeeRequestDto.password);
            } else {
                employee.setPassword(bcryptEncoder.encode(employeeRequestDto.password));
            }

            employee.setAbout(employeeRequestDto.about);
            employee.setCategory(categoryMapper.dtoToEntity(employeeRequestDto.category));
            employee.setCountry(employeeRequestDto.country);
            employee.setFirstName(employeeRequestDto.firstName);
            employee.setLastName(employeeRequestDto.lastName);
            employee.setExpectedSalary(employeeRequestDto.expectedSalary);
            employee.setSkills(employeeRequestDto.skills.stream().map(skillMapper::dtoToEntity).collect(Collectors.toList()));
            employee.setBenefits(employeeRequestDto.benefits.stream().map(benefitMapper::dtoToEntity).collect(Collectors.toList()));
            employeeRepository.save(employee);

            Optional<RegisteredUser> registeredUserOptional = registeredUserRepository.findRegisteredUserByTypeAndId("employee", employeeRequestDto.id);
            if (registeredUserOptional.isPresent()) {
                RegisteredUser registeredUser = registeredUserOptional.get();
                registeredUser.setEmail(employeeRequestDto.email);

                if (registeredUser.getPassword().equals(employeeRequestDto.password)) {
                    registeredUser.setPassword(employeeRequestDto.password);
                } else {
                    registeredUser.setPassword(bcryptEncoder.encode(employeeRequestDto.password));
                }

                registeredUserRepository.save(registeredUser);
            }

            return employeeMapper.entityToDto(employee);

        } else {
            throw new NonExistingException("Employee doesn't exists with id " + employeeRequestDto.id);
        }
    }
}
