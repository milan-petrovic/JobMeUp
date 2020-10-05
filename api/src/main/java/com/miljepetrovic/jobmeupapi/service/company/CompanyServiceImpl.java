package com.miljepetrovic.jobmeupapi.service.company;

import java.util.List;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.miljepetrovic.jobmeupapi.dto.company.CompanyDto;
import com.miljepetrovic.jobmeupapi.dto.company.CompanyMapper;
import com.miljepetrovic.jobmeupapi.exception.ExistingException;
import com.miljepetrovic.jobmeupapi.model.Company;
import com.miljepetrovic.jobmeupapi.repository.CompanyRepository;

@Service
public class CompanyServiceImpl implements CompanyService {
    private final static Logger logger = LoggerFactory.getLogger(CompanyServiceImpl.class);

    private final CompanyRepository companyRepository;
    private final CompanyMapper companyMapper;

    public CompanyServiceImpl(CompanyRepository companyRepository, CompanyMapper companyMapper) {
        this.companyRepository = companyRepository;
        this.companyMapper = companyMapper;
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

        if (companyRepository.findByEmail(companyDto.email).isPresent()) {
            throw new ExistingException("Company with email " + companyDto.email + " already exists.");
        }

        Company company = companyMapper.dtoToEntity(companyDto);
        Company persistedCompany = companyRepository.save(company);
        return companyMapper.entityToDto(persistedCompany);
    }
}
