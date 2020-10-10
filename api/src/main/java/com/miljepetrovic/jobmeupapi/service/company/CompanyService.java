package com.miljepetrovic.jobmeupapi.service.company;

import java.util.List;

import com.miljepetrovic.jobmeupapi.dto.company.CompanyDto;
import com.miljepetrovic.jobmeupapi.exception.ExistingException;
import com.miljepetrovic.jobmeupapi.exception.NonExistingException;

public interface CompanyService {
    List<CompanyDto> findAllCompanies();
    CompanyDto saveCompany(CompanyDto companyDto) throws ExistingException;
    CompanyDto findCompanyById(int id) throws NonExistingException;
}
