package com.miljepetrovic.jobmeupapi.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.miljepetrovic.jobmeupapi.model.Contract;

@Repository
public interface ContractRepository extends JpaRepository<Contract, Integer> {
    List<Contract> findContractByEmployeeId(int employeeId);
    List<Contract> findContractByCompanyId(int companyId);
    List<Contract> findAllByActiveTrueAndEmployeeId(int employeeId);
    List<Contract> findAllByActiveFalseAndEmployeeId(int employeeId);
}
