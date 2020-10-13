package com.miljepetrovic.jobmeupapi.service.jwtuserdetailsservice;

import java.util.ArrayList;
import java.util.Optional;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.miljepetrovic.jobmeupapi.dto.admin.AdminDto;
import com.miljepetrovic.jobmeupapi.dto.admin.AdminMapper;
import com.miljepetrovic.jobmeupapi.dto.company.CompanyDto;
import com.miljepetrovic.jobmeupapi.dto.company.CompanyMapper;
import com.miljepetrovic.jobmeupapi.dto.employee.EmployeeDto;
import com.miljepetrovic.jobmeupapi.dto.employee.EmployeeMapper;
import com.miljepetrovic.jobmeupapi.exception.NonExistingException;
import com.miljepetrovic.jobmeupapi.model.Admin;
import com.miljepetrovic.jobmeupapi.model.Company;
import com.miljepetrovic.jobmeupapi.model.Employee;
import com.miljepetrovic.jobmeupapi.model.RegisteredUser;
import com.miljepetrovic.jobmeupapi.repository.AdminRepository;
import com.miljepetrovic.jobmeupapi.repository.CompanyRepository;
import com.miljepetrovic.jobmeupapi.repository.EmployeeRepository;
import com.miljepetrovic.jobmeupapi.repository.RegisteredUserRepository;

@Service
public class JwtUserDetailsService implements UserDetailsService {

    private final EmployeeRepository employeeRepository;
    private final CompanyRepository companyRepository;
    private final AdminRepository adminRepository;
    private final EmployeeMapper employeeMapper;
    private final CompanyMapper companyMapper;
    private final AdminMapper adminMapper;
    private final RegisteredUserRepository registeredUserRepository;

    public JwtUserDetailsService(EmployeeRepository employeeRepository, CompanyRepository companyRepository, AdminRepository adminRepository, EmployeeMapper employeeMapper, CompanyMapper companyMapper, AdminMapper adminMapper, RegisteredUserRepository registeredUserRepository) {
        this.employeeRepository = employeeRepository;
        this.companyRepository = companyRepository;
        this.adminRepository = adminRepository;
        this.employeeMapper = employeeMapper;
        this.companyMapper = companyMapper;
        this.adminMapper = adminMapper;
        this.registeredUserRepository = registeredUserRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<RegisteredUser> registeredUserByEmail = registeredUserRepository.findRegisteredUserByEmail(username);
        return new User(username, registeredUserByEmail.get().getPassword(),
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

    public AdminDto loadAdminByEmail(String email) throws NonExistingException {
        Optional<Admin> adminOptional = adminRepository.findByEmail(email);
        if (adminOptional.isPresent()) {
            return adminMapper.entityToDto(adminOptional.get());
        } else {
            throw new NonExistingException("Admin not found with email: " + email);
        }
    }
}
