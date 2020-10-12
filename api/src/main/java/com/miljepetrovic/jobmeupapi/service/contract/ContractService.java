package com.miljepetrovic.jobmeupapi.service.contract;

import java.util.List;

import com.miljepetrovic.jobmeupapi.dto.contract.ContractDto;
import com.miljepetrovic.jobmeupapi.dto.contract.ContractRequestDto;

public interface ContractService {
    List<ContractDto> findAllContracts();
    List<ContractDto> findAllEmployeeContracts(int employeeId);
    List<ContractDto> findAllCompanyContracts(int companyId);
    ContractRequestDto postContract(ContractRequestDto contractDto);
    List<ContractDto> findAllActiveContractsByEmployee(int employeeId);
    List<ContractDto> findAllPastContractsByEmployee(int employeeId);
    void closeContract(int contractId);
}
