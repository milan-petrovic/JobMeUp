package com.miljepetrovic.jobmeupapi.dto.joboffer;

import java.util.Date;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

import com.miljepetrovic.jobmeupapi.dto.company.CompanyDto;
import com.miljepetrovic.jobmeupapi.dto.employee.EmployeeDto;

public class JobOfferDto {

    @Min(value = 0)
    public int id;

    public EmployeeDto employee;

    public CompanyDto company;

    @NotEmpty()
    @Size(min = 5, max = 2048)
    public String description;

    public boolean active;

    @NotEmpty()
    public String salary;

    @NotEmpty()
    public String position;

    public Date creationDate;
}
