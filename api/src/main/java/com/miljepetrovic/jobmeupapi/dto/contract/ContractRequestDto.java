package com.miljepetrovic.jobmeupapi.dto.contract;

import java.util.Date;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotEmpty;

import com.miljepetrovic.jobmeupapi.dto.company.CompanyDto;
import com.miljepetrovic.jobmeupapi.dto.employee.EmployeeDto;

public class ContractRequestDto {
    @Min(value = 0)
    public int id;

    @NotEmpty()
    public EmployeeDto employee;

    @NotEmpty()
    public CompanyDto company;

    public boolean active;

    public Date creationDate;

    public int jobOfferId;
}
