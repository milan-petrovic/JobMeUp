package com.miljepetrovic.jobmeupapi.service.jwtuserdetailsservice;

import java.util.ArrayList;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.miljepetrovic.jobmeupapi.dto.company.CompanyDto;
import com.miljepetrovic.jobmeupapi.dto.company.CompanyMapper;
import com.miljepetrovic.jobmeupapi.dto.employee.EmployeeDto;
import com.miljepetrovic.jobmeupapi.dto.employee.EmployeeMapper;
import com.miljepetrovic.jobmeupapi.exception.NonExistingException;
import com.miljepetrovic.jobmeupapi.model.Company;
import com.miljepetrovic.jobmeupapi.model.Employee;
import com.miljepetrovic.jobmeupapi.repository.AdminRepository;
import com.miljepetrovic.jobmeupapi.repository.CompanyRepository;
import com.miljepetrovic.jobmeupapi.repository.EmployeeRepository;

@Service
public class JwtUserDetailsService implements UserDetailsService {

    private final EmployeeRepository employeeRepository;
    private final CompanyRepository companyRepository;
    private final AdminRepository adminRepository;
    private final EmployeeMapper employeeMapper;
    private final CompanyMapper companyMapper;
    @Autowired
    private  PasswordEncoder bcryptEncoder;

    public JwtUserDetailsService(EmployeeRepository employeeRepository, CompanyRepository companyRepository, AdminRepository adminRepository, EmployeeMapper employeeMapper, CompanyMapper companyMapper) {
        this.employeeRepository = employeeRepository;
        this.companyRepository = companyRepository;
        this.adminRepository = adminRepository;
        this.employeeMapper = employeeMapper;
        this.companyMapper = companyMapper;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
            return new User(username, "$2a$10$slYQmyNdGzTn7ZLBXBChFOC9f6kFjAqPhccnP6DxlWXx2lPk1C3G6",
                    new ArrayList<>());
    }

    public EmployeeDto loadEmployeeByEmail(String email) throws NonExistingException {
        Optional<Employee> employeeByEmail = employeeRepository.findEmployeeByEmail(email);
        if(employeeByEmail.isPresent()) {
            return employeeMapper.entityToDto(employeeByEmail.get());
        } else {
            throw new NonExistingException(("Employee not found with email: " + email));
        }
    }

    public CompanyDto loadCompanyByEmail(String email) throws NonExistingException {
        Optional<Company> companyByEmail = companyRepository.findByEmail(email);
        if(companyByEmail.isPresent()) {
            return companyMapper.entityToDto(companyByEmail.get());
        } else {
            throw new NonExistingException(("Company not found with email: " + email));
        }
    }
}
