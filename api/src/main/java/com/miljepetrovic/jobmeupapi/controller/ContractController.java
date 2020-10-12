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

import com.miljepetrovic.jobmeupapi.dto.contract.ContractDto;
import com.miljepetrovic.jobmeupapi.dto.contract.ContractRequestDto;
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

    @GetMapping(value = "/employee/active/{employeeId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<ContractDto>> getAllActiveContractsByEmployee(@PathVariable(name = "employeeId") int employeeId) {
        logger.info("GET /contract/employee/active/{}", employeeId);

        return ResponseEntity.ok(contractService.findAllActiveContractsByEmployee(employeeId));
    }

    @GetMapping(value = "/employee/past/{employeeId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<ContractDto>> getAllPastContractsByEmployee(@PathVariable(name = "employeeId") int employeeId) {
        logger.info("GET /contracts/employee/past/{}", employeeId);

        return ResponseEntity.ok(contractService.findAllPastContractsByEmployee(employeeId));
    }

    @GetMapping(value = "/company/active/{companyId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<ContractDto>> getAllActiveContractsByCompany(@PathVariable(name = "companyId") int companyId) {
        logger.info("GET /contract/company/active/{}", companyId);

        return ResponseEntity.ok(contractService.findAllActiveContractsByCompany(companyId));
    }

    @GetMapping(value = "/company/past/{companyId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<ContractDto>> getAllPastContractsByCompany(@PathVariable(name = "companyId") int companyId) {
        logger.info("GET /contracts/company/past/{}", companyId);

        return ResponseEntity.ok(contractService.findAllPastContractsByCompany(companyId));
    }

    @GetMapping(value = "/company/{companyId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<ContractDto>> getAllCompanyContracts(@PathVariable int companyId) {
        logger.info("GET /contracts/company/{}", companyId);

        return ResponseEntity.ok(contractService.findAllCompanyContracts(companyId));
    }

    @PostMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> postContract(@RequestBody ContractRequestDto contractDto) {
        logger.info("POST /contracts {}", contractDto);

        ContractRequestDto persistedContract = contractService.postContract(contractDto);

        return ResponseEntity.created(URI.create(String.valueOf(contractDto.jobOfferId))).build();
    }

    @PostMapping(value = "/close/{contractId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> closeContract(@PathVariable(name = "contractId") int contractId) {
        logger.info("POST /contracts/close/{}", contractId);

        contractService.closeContract(contractId);

        return ResponseEntity.accepted().build();
    }
}
