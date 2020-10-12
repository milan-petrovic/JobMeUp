package com.miljepetrovic.jobmeupapi.service.contract;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.miljepetrovic.jobmeupapi.dto.contract.ContractDto;
import com.miljepetrovic.jobmeupapi.dto.contract.ContractMapper;
import com.miljepetrovic.jobmeupapi.dto.contract.ContractRequestDto;
import com.miljepetrovic.jobmeupapi.model.Contract;
import com.miljepetrovic.jobmeupapi.repository.ContractRepository;
import com.miljepetrovic.jobmeupapi.service.job_offer.JobOfferService;

@Service
public class ContractServiceImpl implements ContractService {
    private final static Logger logger = LoggerFactory.getLogger(ContractServiceImpl.class);

    private final ContractRepository contractRepository;
    private final ContractMapper contractMapper;
    private final JobOfferService jobOfferService;

    public ContractServiceImpl(ContractMapper contractMapper, ContractRepository contractRepository, JobOfferService jobOfferService) {
        this.contractRepository = contractRepository;
        this.contractMapper = contractMapper;
        this.jobOfferService = jobOfferService;
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

    @Override
    public ContractRequestDto postContract(ContractRequestDto contractDto) {
        logger.debug("Saving contract {}", contractDto);
        Contract contract = contractMapper.requestDto(contractDto);
        Contract persistedContract = contractRepository.save(contract);;

        jobOfferService.declineJobOffer(contractDto.jobOfferId);

        return contractDto;
    }

    @Override
    public List<ContractDto> findAllActiveContractsByEmployee(int employeeId) {
        logger.debug("Find all active contracts by employee with id {}", employeeId);
        List<Contract> contractEntities = contractRepository.findAllByActiveTrueAndEmployeeId(employeeId);

        return contractEntities.stream().map(contractMapper::entityToDto).collect(Collectors.toList());
    }

    @Override
    public List<ContractDto> findAllPastContractsByEmployee(int employeeId) {
        logger.debug("Find all past contracts by employee with id {}", employeeId);
        List<Contract> contractEntities = contractRepository.findAllByActiveFalseAndEmployeeId(employeeId);

        return contractEntities.stream().map(contractMapper::entityToDto).collect(Collectors.toList());
    }

    @Override
    public List<ContractDto> findAllActiveContractsByCompany(int companyId) {
        logger.debug("Find all active contracts by company with id {}", companyId);
        List<Contract> contractEntities = contractRepository.findAllByActiveTrueAndCompanyId(companyId);

        return contractEntities.stream().map(contractMapper::entityToDto).collect(Collectors.toList());
    }

    @Override
    public List<ContractDto> findAllPastContractsByCompany(int companyId) {
        logger.debug("Find all past contracts by company with id {}", companyId);
        List<Contract> contractEntities = contractRepository.findAllByActiveFalseAndCompanyId(companyId);

        return contractEntities.stream().map(contractMapper::entityToDto).collect(Collectors.toList());
    }

    @Override
    public void closeContract(int contractId) {
        logger.debug("Closing contract with id {}", contractId);

        Optional<Contract> contractOptional = contractRepository.findById(contractId);
        if (contractOptional.isPresent()) {
            Contract contract = contractOptional.get();
            contract.setActive(false);
            contractRepository.save(contract);
        }
    }
}
