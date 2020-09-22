package com.miljepetrovic.jobmeupapi.service.company;

import java.util.List;

import com.miljepetrovic.jobmeupapi.dto.company.CompanyDto;

public interface CompanyService {
    List<CompanyDto> findAllCompanies();
}
