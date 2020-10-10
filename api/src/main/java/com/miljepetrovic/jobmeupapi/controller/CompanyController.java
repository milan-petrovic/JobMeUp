package com.miljepetrovic.jobmeupapi.controller;

import java.net.URI;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.miljepetrovic.jobmeupapi.dto.company.CompanyDto;
import com.miljepetrovic.jobmeupapi.exception.ExistingException;
import com.miljepetrovic.jobmeupapi.exception.NonExistingException;
import com.miljepetrovic.jobmeupapi.service.company.CompanyService;

@RestController
@RequestMapping("companies")
public class CompanyController {
    private final static Logger logger = LoggerFactory.getLogger(CompanyController.class);

    private final CompanyService companyService;

    @Autowired
    public CompanyController(CompanyService companyService) {
        this.companyService = companyService;
    }

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<CompanyDto>> getAllCompanies() {
        logger.info("GET /companies");

        return ResponseEntity.ok(companyService.findAllCompanies());
    }

    @PostMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> postCompany(@RequestBody CompanyDto companyDto) throws ExistingException {
        logger.info("POST /companies {}", companyDto);

        CompanyDto persistedCompany = companyService.saveCompany(companyDto);

        return ResponseEntity.created(URI.create(String.valueOf(persistedCompany.id))).build(); 
    }

    @GetMapping(value = "/{companyId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<CompanyDto> getCompany(@PathVariable(name = "companyId") int companyId) throws NonExistingException {
        logger.info("GET /companies/{} ", companyId);

        return ResponseEntity.ok(companyService.findCompanyById(companyId));
    }
}
