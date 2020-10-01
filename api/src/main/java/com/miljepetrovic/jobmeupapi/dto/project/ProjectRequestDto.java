package com.miljepetrovic.jobmeupapi.dto.project;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

import com.miljepetrovic.jobmeupapi.dto.employee.EmployeeDto;
import com.miljepetrovic.jobmeupapi.model.Employee;

public class ProjectRequestDto {
    @Min(value = 0)
    public int id;

    @NotEmpty()
    @Size(min = 5, max= 255)
    public String name;

    @NotEmpty()
    @Size(min = 5, max= 255)
    public String description;

    @NotEmpty()
    @Size(min = 5, max= 255)
    public String technicalStack;

    public EmployeeDto employee;
}
