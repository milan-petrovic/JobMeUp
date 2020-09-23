package com.miljepetrovic.jobmeupapi.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.miljepetrovic.jobmeupapi.dto.contract.ContractDto;
import com.miljepetrovic.jobmeupapi.service.contract.ContractService;

@RestController
@RequestMapping("/contracts")
public class ContractController {
    private final Logger logger = LoggerFactory.getLogger(ContractController.class);

    private final ContractService contractService;

    @Autowired
    public ContractController(ContractService contractService) {
        this.contractService = contractService;
    }

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<ContractDto>> getAllContracts() {
        logger.info("GET /contracts");

        return ResponseEntity.ok(contractService.findAllContracts());
    }

    @GetMapping(value = "/employee/{employeeId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<ContractDto>> getAllEmployeeContracts(@PathVariable int employeeId) {
        logger.info("GET /contracts/employee/{}", employeeId);

        return ResponseEntity.ok(contractService.findAllEmployeeContracts(employeeId));
    }

    @GetMapping(value = "/company/{companyId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<ContractDto>> getAllCompanyContracts(@PathVariable int companyId) {
        logger.info("GET /contracts/company/{}", companyId);

        return ResponseEntity.ok(contractService.findAllCompanyContracts(companyId));
    }
}
