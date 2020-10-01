package com.miljepetrovic.jobmeupapi.dto.employment;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotEmpty;

import com.miljepetrovic.jobmeupapi.dto.employee.EmployeeDto;

public class EmploymentRequestDto {
    @Min(value = 0)
    public int id;

    @NotEmpty()
    public String client;

    public String description;

    @NotEmpty()
    public String position;

    @NotEmpty()
    public String startDate;

    @NotEmpty()
    public String endDate;

    @NotEmpty()
    public EmployeeDto employee;

    @Override
    public String toString() {
        return "EmploymentRequestDto{" +
                "id=" + id +
                ", client='" + client + '\'' +
                ", description='" + description + '\'' +
                ", position='" + position + '\'' +
                ", startDate='" + startDate + '\'' +
                ", endDate='" + endDate + '\'' +
                ", employee=" + employee +
                '}';
    }
}
