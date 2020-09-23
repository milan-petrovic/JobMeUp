package com.miljepetrovic.jobmeupapi.service.contract;

import java.util.List;

import com.miljepetrovic.jobmeupapi.dto.contract.ContractDto;

public interface ContractService {
    List<ContractDto> findAllContracts();
    List<ContractDto> findAllEmployeeContracts(int employeeId);
    List<ContractDto> findAllCompanyContracts(int companyId);
}
