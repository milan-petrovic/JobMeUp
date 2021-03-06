package com.miljepetrovic.jobmeupapi.service.company;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.miljepetrovic.jobmeupapi.dto.company.CompanyDto;
import com.miljepetrovic.jobmeupapi.dto.company.CompanyMapper;
import com.miljepetrovic.jobmeupapi.dto.registered_user.RegisteredUserDto;
import com.miljepetrovic.jobmeupapi.exception.ExistingException;
import com.miljepetrovic.jobmeupapi.exception.NonExistingException;
import com.miljepetrovic.jobmeupapi.model.Company;
import com.miljepetrovic.jobmeupapi.model.RegisteredUser;
import com.miljepetrovic.jobmeupapi.repository.CompanyRepository;
import com.miljepetrovic.jobmeupapi.repository.RegisteredUserRepository;
import com.miljepetrovic.jobmeupapi.service.registered_user.RegisteredUserService;

@Service
public class CompanyServiceImpl implements CompanyService {
    private final static Logger logger = LoggerFactory.getLogger(CompanyServiceImpl.class);

    private final CompanyRepository companyRepository;
    private final RegisteredUserRepository registeredUserRepository;
    private final RegisteredUserService registeredUserService;
    private final CompanyMapper companyMapper;
    private final PasswordEncoder bcryptEncoder;

    public CompanyServiceImpl(CompanyRepository companyRepository, RegisteredUserRepository registeredUserRepository, CompanyMapper companyMapper, PasswordEncoder bcryptEncoder, RegisteredUserService registeredUserService) {
        this.companyRepository = companyRepository;
        this.registeredUserRepository = registeredUserRepository;
        this.companyMapper = companyMapper;
        this.bcryptEncoder = bcryptEncoder;
        this.registeredUserService = registeredUserService;
    }

    @Override
    public List<CompanyDto> findAllCompanies() {
        logger.debug("Fetching all companies {}");
        List<Company> companies = companyRepository.findAll();
        return companies.stream().map(companyMapper::entityToDto).collect(Collectors.toList());
    }

    @Override
    public CompanyDto saveCompany(CompanyDto companyDto) throws ExistingException {
        if (companyRepository.findCompanyByName(companyDto.name).isPresent()) {
            throw new ExistingException("Company with name " + companyDto.name + " already exists.");
        }

        if (companyRepository.findByEmail(companyDto.email).isPresent() ||
                registeredUserRepository.findRegisteredUserByEmail(companyDto.email).isPresent()) {
            throw new ExistingException("Company with email " + companyDto.email + " already exists.");
        }

        Company company = companyMapper.dtoToEntity(companyDto);
        company.setPassword(bcryptEncoder.encode(companyDto.password));
        Company persistedCompany = companyRepository.save(company);

        RegisteredUserDto registeredUserDto = new RegisteredUserDto();
        registeredUserDto.email = persistedCompany.getEmail();
        registeredUserDto.password = persistedCompany.getPassword();
        registeredUserDto.type = "company";
        registeredUserDto.actualId = persistedCompany.getId();

        registeredUserService.saveRegisteredUser(registeredUserDto);

        return companyMapper.entityToDto(persistedCompany);
    }

    @Override
    public CompanyDto findCompanyById(int id) throws NonExistingException {
        logger.debug("Fetching company with id {}", id);
        Optional<Company> companyOptional = companyRepository.findById(id);

        if (companyOptional.isPresent()) {
            return companyMapper.entityToDto(companyOptional.get());
        } else {
            throw new NonExistingException("Couldn't find company with id " + id);
        }
    }

    @Override
    public CompanyDto updateCompany(CompanyDto companyDto) throws NonExistingException {
        logger.debug("Updating company {}", companyDto);

        Optional<Company> companyOptional = companyRepository.findById(companyDto.id);

        if (companyOptional.isPresent()) {
            Company company = companyOptional.get();
            company.setName(companyDto.name);
            company.setEmail(companyDto.email);

            if (company.getPassword().equals(companyDto.password)) {
                company.setPassword(companyDto.password);
            } else {
                company.setPassword(bcryptEncoder.encode(companyDto.password));
            }

            company.setAbout(companyDto.about);
            company.setAddress(companyDto.address);
            company.setCountry(companyDto.country);
            company.setSize(companyDto.size);
            company.setFoundedYear(companyDto.foundedYear);
            company.setPhoneNumber(companyDto.phoneNumber);

            Company updatedCompany = companyRepository.save(company);

            Optional<RegisteredUser> registeredUserOptional = registeredUserRepository.findRegisteredUserByTypeAndId("company", companyDto.id);
            if (registeredUserOptional.isPresent()) {
                RegisteredUser registeredUser = registeredUserOptional.get();
                registeredUser.setEmail(companyDto.email);

                if (registeredUser.getPassword().equals(companyDto.password)) {
                    registeredUser.setPassword(companyDto.password);
                } else {
                    registeredUser.setPassword(bcryptEncoder.encode(companyDto.password));
                }

                registeredUserRepository.save(registeredUser);
            }

            return companyMapper.entityToDto(updatedCompany);
        } else {
            throw new NonExistingException("Couldn't find company with id: " + companyDto.id);
        }
    }
}
