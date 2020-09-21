package com.miljepetrovic.jobmeupapi.dto.employment;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotEmpty;

public class EmploymentDto {

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

    @Override
    public String toString() {
        return "EmploymentDto{" +
                "id=" + id +
                ", client='" + client + '\'' +
                ", description='" + description + '\'' +
                ", position='" + position + '\'' +
                ", startDate='" + startDate + '\'' +
                ", endDate='" + endDate + '\'' +
                '}';
    }
}
