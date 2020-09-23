package com.miljepetrovic.jobmeupapi.service.contract;

import java.util.List;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.miljepetrovic.jobmeupapi.dto.contract.ContractDto;
import com.miljepetrovic.jobmeupapi.dto.contract.ContractMapper;
import com.miljepetrovic.jobmeupapi.model.Contract;
import com.miljepetrovic.jobmeupapi.repository.ContractRepository;

@Service
public class ContractServiceImpl implements ContractService {
    private final static Logger logger = LoggerFactory.getLogger(ContractServiceImpl.class);

    private final ContractRepository contractRepository;
    private final ContractMapper contractMapper;

    public ContractServiceImpl(ContractMapper contractMapper, ContractRepository contractRepository) {
        this.contractRepository = contractRepository;
        this.contractMapper = contractMapper;
    }

    @Override
    public List<ContractDto> findAllContracts() {
        logger.debug("Fetching contracts {}");
        List<Contract> contracts = contractRepository.findAll();

        return contracts.stream().map(contractMapper::entityToDto).collect(Collectors.toList());
    }

    @Override
    public List<ContractDto> findAllEmployeeContracts(int employeeId) {
        logger.debug("Fetching all employee contracts {}", employeeId);
        List<Contract> contractsByEmployeeId = contractRepository.findContractByEmployeeId(employeeId);

        return contractsByEmployeeId.stream().map(contractMapper::entityToDto).collect(Collectors.toList());
    }

    @Override
    public List<ContractDto> findAllCompanyContracts(int companyId) {
        logger.debug("Fetching all company contracts {}", companyId);
        List<Contract> contractsByCompanyId = contractRepository.findContractByCompanyId(companyId);

        return contractsByCompanyId.stream().map(contractMapper::entityToDto).collect(Collectors.toList());
    }
}
