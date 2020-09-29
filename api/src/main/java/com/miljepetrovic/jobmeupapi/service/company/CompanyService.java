package com.miljepetrovic.jobmeupapi.service.company;

import java.util.List;

import com.miljepetrovic.jobmeupapi.dto.company.CompanyDto;
import com.miljepetrovic.jobmeupapi.exception.ExistingException;

public interface CompanyService {
    List<CompanyDto> findAllCompanies();
    CompanyDto saveCompany(CompanyDto companyDto) throws ExistingException;
}
